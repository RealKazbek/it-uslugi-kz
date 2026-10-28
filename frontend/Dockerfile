FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# ISR needs the API while building, so the build runs at container start (after the backend is healthy).
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app

ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000

CMD ["sh", "-c", "npm run build && npm run start"]
