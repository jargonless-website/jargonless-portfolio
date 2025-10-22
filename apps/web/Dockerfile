# Build React/Vite
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache python3 make g++ libc6-compat
RUN corepack enable && corepack prepare npm@10.8.2 --activate
RUN npm ci --no-audit --no-fund \
  || (echo '--- NPM LOGS ---' && ls -l /root/.npm/_logs || true && \
      cat /root/.npm/_logs/*-debug*.log || true && exit 1)
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html