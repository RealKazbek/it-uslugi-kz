# E2E results (M5)

Run: 2026-10-29 (UTC 00:15), local Docker Compose stack (`make up`, then `make seed`, then `make e2e` once).
No secrets, chat ids or tokens are recorded here. Log lines were passed through the token redaction filter.

## Stack

- `docker compose up` (`make up`): db, backend, frontend, bot all reported `healthy`.
- The database volume already held data, so `make init` was not needed. `make seed` ran idempotently.

## Seed counts

| Item | Expected | Actual |
| --- | --- | --- |
| Categories | 8 | 8 |
| Products | 59 | 59 |
| Cities | 25 | 25 |

Seed log: `Seed finished: SeedResult(categories=8, products=59, faqs=177, cities=25)`.
Via API: product `lending` and the first category both have non-empty `ru`, `kk` and `en` titles.

## Pages (frontend on 127.0.0.1:3000)

| Path | HTTP status |
| --- | --- |
| / | 200 |
| /kk | 200 |
| /en | 200 |
| /catalog | 200 |
| /products/lending | 200 |
| /city/almaty | 200 |
| /kk/city/almaty | 200 |
| /sitemap.xml | 200 |

## make e2e (one run, exit 0)

```
== E2E: lead from the website (frontend /api/lead) ==
E2E_SITE_POST=ok
E2E_SITE_LEAD_ID=14
E2E_SITE_MESSAGE_ID=15
E2E_SITE_OK
== E2E: lead from the bot (real dispatcher, real backend) ==
E2E_BOT_OK replies=10 user=<fake e2e user>
E2E_BOT_LEAD_ID=15
E2E_BOT_MESSAGE_ID=16
E2E_BOT_NOTIFIED=ok
== E2E passed: 2 leads (site, bot), 2 admin notifications confirmed in backend logs ==
```

Summary:

| Channel | Lead id | Source | Telegram message_id | Backend log line |
| --- | --- | --- | --- | --- |
| Website (`/api/lead` on the frontend) | 14 | site | 15 | `Telegram notification sent for lead 14 (message_id 15)` |
| Bot (fake private user 777000111, @e2e_m5) | 15 | bot | 16 | `Telegram notification sent for lead 15 (message_id 16)` |

The bot run recorded 10 replies to the fake user, including the thank-you text. The bot lead has `telegram_user_id` 777000111, product `lending`, lang `ru`.

## Notes

- Each `make e2e` run creates exactly 2 real leads and 2 real admin notifications. Re-running adds more.
- The site request also sends `contact` and `channel`, because the frontend validator requires them (contact `+77000000001`, channel `whatsapp`).
