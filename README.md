# 🧠 Jargonless Portfolio

![React](https://img.shields.io/badge/Frontend-React%2018-61dafb?logo=react)
![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)
![Nginx](https://img.shields.io/badge/Proxy-Nginx-009639?logo=nginx)
![Docker Compose](https://img.shields.io/badge/Infra-Docker%20Compose-blue?logo=docker)
![Cloudflare](https://img.shields.io/badge/Edge-Cloudflare%20Tunnel-F38020?logo=cloudflare)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub%20Actions-2088FF?logo=githubactions)
![License](https://img.shields.io/badge/License-Private-darkred)

**Self‑hosted analytics + ML portfolio**. Continuous Integration & Deployment with a NAS‑hosted self‑runner and automated GHCR publishing.

_Last updated: October 2025_

---

## ✅ What’s new
- **Self‑hosted GitHub Actions runner (NAS)** → `nas-runner` with labels `nas,synology,docker`.
- **CI/CD pipeline** via `.github/workflows/ci-core.yml` + `deploy.yml`.
- **Auto‑build & push** Docker images to **GitHub Container Registry (GHCR)**.
- **Auto‑redeploy** to Synology NAS when `main` updates.
- **Task Scheduler / startup script** ensures stack auto‑starts after reboot.
- **Complete Cloudflare integration** remains stable with HTTP/2 and QUIC tunnels.

---

## 🌐 Runtime summary (NAS)
- **NAS:** DS1522+ (DSM 7.2.x), Docker 24.x  
- **Root path:** `/volume1/docker/portfolio`
- **Public:** https://jargonless.ai  
- **LAN:** `http://<NAS-IP>:8080` (web), `http://<NAS-IP>:8000/api/health` (api)

### Containers
```
portfolio-nginx-1      → web (React build served via Nginx)
portfolio-api-1        → FastAPI backend
portfolio-jl_tunnel-1  → Cloudflare tunnel (persistent)
j1_gh_runner           → GitHub Actions runner (listens for jobs)
```
All are healthy and restart automatically on DSM boot.

---

## ⚙️ CI/CD Overview

### Workflow: `.github/workflows/ci-core.yml`
- Validates Docker Compose syntax.  
- Generates dummy env files to allow CI to lint without secrets.  

### Workflow: `.github/workflows/deploy.yml`
- **Trigger:** push to `main` or manual dispatch.  
- **Runs on:** `nas-runner` (self-hosted).  
- **Steps:**
  1. Checkout & authenticate to GHCR.
  2. Build and push images (`portfolio-web`, `portfolio-api`).
  3. SSH / local redeploy on NAS via Compose:
     ```bash
     docker compose -f infra/compose/docker-compose.yml                     -f infra/compose/docker-compose.prod.yml                     --env-file infra/compose/.env.tunnel                     up -d --no-deps nginx api
     ```
  4. Health verification (`curl /api/health` → HTTP 200).


---

## 🧩 File structure (current)
```
/volume1/docker/portfolio/
├── apps/
│   ├── web/                # Vite React app
│   └── api/                # FastAPI service
├── infra/
│   ├── compose/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── docker-compose.stg.yml
│   │   ├── docker-compose.runner.yml
│   │   ├── .env.production
│   │   ├── .env.production.stg
│   └── nginx/
│       ├── nginx.conf
│       └── nginx.staging.conf
├── cloudflared/
│   ├── config.stg.yml   
│   └── config.yml
└── .github/workflows/
    ├── build-images.yml
    ├── ci-core.yml
    ├── ci-prod.yml
    └── cd-staging.yml
```

---

## 🧠 Next milestone — PostgreSQL + Strapi
- Create PostgreSQL database 
- Add 'strappi' to `jargonless.ai`
- Confirm posts arrive to each environment.

---


© 2025 William Reed · Jargonless — All rights reserved

test