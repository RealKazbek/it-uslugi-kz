# Deploy: uslugi.realkazbek.site on a VPS

Stack: Docker Compose (db, backend, frontend, bot) on loopback ports, Nginx on the host as the only
public entry point, Let's Encrypt for TLS. Ubuntu 22.04 or 24.04 is assumed; commands run as a sudo user.

## 1. DNS

Create an `A` record `uslugi.realkazbek.site` pointing at the VPS IPv4 address. Wait for it to resolve
before running certbot (step 6):

```
dig +short uslugi.realkazbek.site   # must print the VPS IP
```

## 2. Firewall

```
sudo ufw allow OpenSSH        # 22/tcp
sudo ufw allow 80/tcp         # HTTP (ACME challenge, redirect)
sudo ufw allow 443/tcp        # HTTPS
sudo ufw enable
sudo ufw status verbose
```

Docker publishes the app ports on `127.0.0.1` only (3000, 8000), so they are not reachable from outside
even though Docker bypasses ufw for published ports.

## 3. Docker and the Compose plugin

Use Docker's apt repository (the Ubuntu `docker.io` package has no Compose v2 plugin):

```
sudo apt-get update && sudo apt-get install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"   # log out and back in once
docker compose version
```

Limit container log growth in `/etc/docker/daemon.json`, then restart Docker (`sudo systemctl restart docker`):

```json
{ "log-driver": "json-file", "log-opts": { "max-size": "10m", "max-file": "5" } }
```

## 4. Clone and configure

```
sudo mkdir -p /opt/it-uslugi && sudo chown "$USER": /opt/it-uslugi
git clone https://github.com/RealKazbek/it-uslugi-kz.git /opt/it-uslugi
cd /opt/it-uslugi
cp .env.example .env
chmod 600 .env
```

Generate the two random secrets (run each command, paste the output into `.env`):

```
python3 -c "import secrets;print(secrets.token_urlsafe(50))"   # DJANGO_SECRET_KEY
python3 -c "import secrets;print(secrets.token_urlsafe(50))"   # INTERNAL_API_TOKEN
```

Fill `.env` (never commit it; it is ignored by git). Required values:

| Variable | Value |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | token from BotFather |
| `ADMIN_CHAT_ID` | numeric id of the owner's chat with the bot |
| `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` | new database credentials (password: 24+ random characters) |
| `DJANGO_SECRET_KEY`, `INTERNAL_API_TOKEN` | generated above |
| `DJANGO_DEBUG` | `0` |
| `DJANGO_ALLOWED_HOSTS` | `uslugi.realkazbek.site,localhost,127.0.0.1,backend` (keep `backend`: containers call each other by that Host) |
| `SITE_URL` | `https://uslugi.realkazbek.site` |
| `USD_RATE` | current KZT per USD used for the EN price hints, e.g. `500` |

`docker-compose.yml` reads `DJANGO_ALLOWED_HOSTS` and `SITE_URL` from `.env` with defaults, so the
values above take effect without editing the file. Leave `FRONTEND_INTERNAL_URL`, `API_INTERNAL_URL`
and `BACKEND_URL` empty; compose sets them for the container network.

## 5. First start

```
make init                      # db + backend, seed (8 categories, 59 products, 25 cities), frontend, bot
docker compose ps              # db, backend, frontend, bot: healthy
docker compose exec backend python manage.py createsuperuser
```

`make init` builds the frontend pages from the API, so the seed must run first (the Makefile does this).
On later starts use `make up`.

## 6. Nginx and TLS

```
sudo apt-get install -y nginx certbot python3-certbot-nginx
sudo cp /opt/it-uslugi/deploy/nginx/uslugi.conf /etc/nginx/sites-available/uslugi.conf
sudo ln -s /etc/nginx/sites-available/uslugi.conf /etc/nginx/sites-enabled/uslugi.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d uslugi.realkazbek.site --redirect --agree-tos -m <owner-email>
```

Certbot adds the `443` block and the HTTP-to-HTTPS redirect. Renewal runs from the certbot systemd timer:

```
systemctl list-timers | grep certbot
sudo certbot renew --dry-run
```

The vhost forwards `X-Forwarded-For` (`$proxy_add_x_forwarded_for`), `X-Forwarded-Proto` and `Host`.
The backend trusts exactly one proxy hop (`NUM_PROXIES=1`), and `SECURE_PROXY_SSL_HEADER` relies on the
forwarded proto, so nginx must stay the only public ingress.

Exposure, checked at the edge:

| Path | Public? | Why |
| --- | --- | --- |
| `/`, `/kk`, `/en`, catalog, product, city, sitemap, robots | yes | Next.js frontend |
| `/api/lead` | yes (POST, throttled by the backend) | website lead form, handled by a Next route |
| `/admin/`, `/static/` | yes, admin needs login | Django admin (Whitenoise serves static) |
| `/api/internal/*` | no (404 at nginx) | bot-to-backend API, token-protected |
| `/api/revalidate` | no (404 at nginx) | frontend webhook, reached over the Docker network only |
| `/api/docs`, `/api/schema` | no (404 at nginx) | see the SSH tunnel below |

### API docs through an SSH tunnel

The backend port is loopback-only. From your laptop:

```
ssh -N -L 8000:127.0.0.1:8000 <user>@<vps-ip>
```

Then log in at `http://127.0.0.1:8000/admin/` with a staff account and open
`http://127.0.0.1:8000/api/docs`. Outside `DEBUG`, the docs need a staff session.

## 7. Updates

```
cd /opt/it-uslugi
git pull
make up          # rebuilds changed images; backend runs migrations on start
docker compose ps
```

If the pull brought new catalog content, run `make seed` after `make up`. Seed overwrites admin edits to
seeded products and cities by design.

## 8. Backups

Nightly custom-format dump of the database, kept 14 days. Create the directory once:
`sudo mkdir -p /var/backups/uslugi && sudo chmod 700 /var/backups/uslugi`.

`/etc/cron.d/uslugi-backup` (root):

```
15 3 * * * root cd /opt/it-uslugi && docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > /var/backups/uslugi/db-$(date +\%F).dump 2>/dev/null && find /var/backups/uslugi -name 'db-*.dump' -mtime +14 -delete
```

Copy the dumps off the VPS as well. Restore test (on a scratch database, not the live one):
`docker compose exec -T db pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean < db-YYYY-MM-DD.dump`.

## 9. Logs

```
docker compose logs -f --tail 200 backend bot
docker compose logs -f --tail 200 frontend
```

Lead notifications log `Telegram notification sent for lead N (message_id M)`. The bot token is redacted
from bot output, and httpx logs stay at WARNING. Do not paste raw logs publicly; check them with
`sed -E 's/bot[0-9]+:[A-Za-z0-9_-]+/bot<REDACTED>/g'` before sharing.

## 10. Rotating the Telegram token

1. In BotFather send `/revoke` for the bot and choose the new token.
2. Edit `TELEGRAM_BOT_TOKEN` in `/opt/it-uslugi/.env` (the backend also uses it for admin notifications).
3. Recreate the containers that read it: `docker compose up -d --wait backend bot`.
4. Check: `docker compose logs --tail 50 bot` shows no 401/409 errors, and a test `/start` gets a reply.

Run only one bot process per token. A second poller gets `409 Conflict` from Telegram; the getMe-based
healthcheck does not detect that (see `bot/README.md`).

## 11. Checks after deploy

```
curl -sI https://uslugi.realkazbek.site/ | head -1          # HTTP/2 200
curl -sI https://uslugi.realkazbek.site/api/internal/leads  # 404
curl -s -o /dev/null -w '%{http_code}\n' https://uslugi.realkazbek.site/sitemap.xml   # 200
```

Then open the admin and add a test lead only if you need one; each lead sends a Telegram message.
