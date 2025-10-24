# syntax=docker/dockerfile:1

# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Cache dependencies first
COPY package*.json ./
RUN apk add --no-cache python3 make g++ libc6-compat
RUN corepack enable && corepack prepare npm@10.8.2 --activate

# Install dependencies (cached unless package*.json changes)
RUN npm ci --no-audit --no-fund \
  || (echo '--- NPM LOGS ---' && ls -l /root/.npm/_logs || true && \
      cat /root/.npm/_logs/*-debug*.log || true && exit 1)

# Copy all source code
COPY . .

# Add cache-busting build arg so text changes always trigger rebuild
ARG CACHE_BUSTER=1
RUN echo "Cache bust: $CACHE_BUSTER" && npm run build

# --- Serve stage ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: minimal hardening (read-only FS + no root write)
RUN adduser -D nginxuser && chown -R nginxuser:nginxuser /usr/share/nginx/html
USER nginxuser
