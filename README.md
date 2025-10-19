# 🧠 Jargonless Portfolio — Week **3.5** (Cloudflare Public Launch)

![React](https://img.shields.io/badge/Frontend-React%2018-61dafb?logo=react)
![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)
![Nginx](https://img.shields.io/badge/Proxy-Nginx-009639?logo=nginx)
![Docker Compose](https://img.shields.io/badge/Infra-Docker%20Compose-blue?logo=docker)
![Cloudflare](https://img.shields.io/badge/Edge-Cloudflare%20Tunnel-F38020?logo=cloudflare)
![License](https://img.shields.io/badge/License-Private-darkred)

**Self‑hosted analytics + ML portfolio**. This release finalises **Week 3.5** — Cloudflare integration and *public* availability of the NAS‑hosted stack.

_Last updated: Oct 2025_

---

## ✅ What’s new in 3.5
- **Cloudflare Tunnel live** for `jargonless.ai` and `api.jargonless.ai` (no router ports).
- **Compose made prod‑parity** (same file for dev/prod; env files control behaviour).
- **Explicit env file loading on Synology** (`/volume1/.../.env.production`).  
- **cloudflared** fixed to run by **token**:  
  `command: tunnel --config /etc/cloudflared/config.yml run --token ${CLOUDFLARE_TUNNEL_TOKEN}`
- **Ingress config** switched to **Docker service names** (`nginx`, `api`) for reliable DNS on the project network.

---

## 🌐 Runtime summary (NAS)
- **NAS:** DS1522+ (DSM 7.2.x), Docker 24.x  
- **Root path:** `/volume1/docker/portfolio`
- **Public:** https://jargonless.ai  
- **LAN:** `http://<NAS-IP>:8080` (web), `http://<NAS-IP>:8000/api/health` (api)

### Folders
```
/volume1/docker/portfolio/
├── apps/
│   ├── web/                # Vite app; built into /dist
│   └── api/                # FastAPI (image: jargonless/api:week0)
├── infra/
│   ├── compose/
│   │   ├── docker-compose.yml
│   │   ├── .env            # local (ignored)
│   │   ├── .env.production # prod (NOT in git)
│   └── nginx/nginx.conf
└── cloudflared/
    └── config.yml          # ingress rules
```

### Key files
**`infra/compose/docker-compose.yml` (relevant parts)**
```yaml
services:
  nginx:
    image: nginx:alpine
    volumes:
      - /volume1/docker/portfolio/infra/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - /volume1/docker/portfolio/apps/web/dist:/usr/share/nginx/html:ro
  jl_tunnel:
    image: cloudflare/cloudflared:latest
    env_file:
      - /volume1/docker/portfolio/infra/compose/.env.production
    command: tunnel --config /etc/cloudflared/config.yml run --token ${CLOUDFLARE_TUNNEL_TOKEN}
    volumes:
      - /volume1/docker/portfolio/cloudflared:/etc/cloudflared
```

**`cloudflared/config.yml`**
```yaml
ingress:
  - hostname: jargonless.ai
    service: http://nginx:80
  - hostname: api.jargonless.ai
    service: http://api:8000
  - service: http_status:404
```

**`infra/compose/.env.production`**
```
PORTFOLIO_ENV=production
DOMAIN=jargonless.ai
HOST_HTTP_PORT=8080
HOST_API_PORT=8000
CLOUDFLARE_TUNNEL_TOKEN=<paste real token>
```

---

## 🧪 Verify
- Container Manager → **Containers**: `jl_nginx_week0`, `jl_api_week0` (healthy), `jl_tunnel` (running).
- Tunnel logs show: **“Connection established”** + **“Registered ingress”**.
- Browser: https://jargonless.ai renders identically to `http://<NAS-IP>:8080`.

---

## 📅 Roadmap
| Week | Milestone | Status |
|------|-----------|--------|
| 0 | Repo & skeleton | ✅ |
| 1 | React landing (Vite) | ✅ |
| 2 | Nginx + FastAPI + Compose | ✅ |
| 3 | NAS deployment (LAN) | ✅ |
| **3.5** | **Cloudflare public launch** | **✅** |
| 4 | CI/CD to NAS (GitHub Actions) | 🔜 |
| 5 | Strapi CMS | 🔜 |

---

## 🔒 Notes
- Secrets never in git. `.env.production` only on NAS.
- For now, API image shipped as local tar (`docker save/load`). CI (Week 4) will replace this with registry pushes.

© 2025 William Reed · Jargonless — All rights reserved
