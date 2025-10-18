# 🧠 Jargonless Portfolio — Week 3 Production Launch

![Build](https://img.shields.io/github/actions/workflow/status/jargonless-website/jargonless-portfolio/ci-week3.yml?label=Build&logo=github)
![React](https://img.shields.io/badge/Frontend-React%2018-61dafb?logo=react)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS%20via%20CDN-38bdf8?logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)
![Nginx](https://img.shields.io/badge/Proxy-Nginx-009639?logo=nginx)
![Docker Compose](https://img.shields.io/badge/Infra-Docker%20Compose-blue?logo=docker)
![License](https://img.shields.io/badge/License-Private-darkred)

**Self-hosted analytics and machine-learning portfolio**, following the official Jargonless Blueprint.

_Last updated: October 2025_

---

## 🧩 What is here

- ✅ **React + Vite app** (Week 1 milestone, “Coming Soon” landing page)
  - Responsive layout with Jargonless logo, Tailwind CDN, and live reload
  - Uses real `favicon.png` (32×32) and `logo-1024.png` for page and preview
- ✅ **FastAPI service** with `GET /api/health`
- ✅ **Nginx reverse proxy** serving the built React app and proxying `/api/*` to FastAPI
- ✅ **Docker Compose stack** (`nginx` + `api`) unified for dev/prod with env vars for ports (8080/8000)
- ✅ **Healthcheck** for `api` using Python `urllib.request` (so `nginx` waits until API is ready)
- ✅ **Environment files** under `infra/compose`: `.env`, `.env.production`, `.env.example`
- ✅ **Deployed successfully to Synology NAS (DS1522+)**
  - DSM 7.2.1-69057 Update 8, Docker 24.0.2-1543
  - Path: `/docker/portfolio`
  - LAN Access: http://192.168.86.46:8080 (web), http://192.168.86.46:8000/api/health (api)
- ✅ **Makefile helpers** (optional) for `dev`, `prod`, `down`, `logs`

> **Local endpoints**
> - Web (Nginx): http://localhost:8080  
> - API (proxied): http://localhost:8080/api/health → `{"ok": true}`  
> - API direct: http://localhost:8000/api/health

---

## 📅 Project Roadmap (per Blueprint)

| Week | Milestone | Description | Status |
|------|-----------|-------------|--------|
| **0** | **Repo & Skeleton** | Monorepo + base layout | ✅ Completed |
| **1** | **React Coming Soon** | Vite + React app, Tailwind CDN, favicon + logo integrated | ✅ Completed |
| **2** | **IaC Baseline** | Compose stack (Nginx + API) validated locally + healthchecks + env files | ✅ Completed |
| **3** | **Production Launch** | Stack deployed to Synology NAS on LAN | ✅ **Completed** |
| **3.5** | **Terraform (Cloudflare)** | Manage Cloudflare DNS, Tunnel, and Zero Trust as code | 🔜 Planned |
| **4** | **CI/CD Automation** | GitHub Actions: build web, sync to NAS, `docker compose up -d` over SSH | 🔜 Pending |
| **5** | **Strapi Integration** | CMS with `Post` type (enum: Power BI / Grafana / Notebook / ML) | 🔜 Pending |
| **6–9** | **Content Embeds & ML Demo** | Power BI / Grafana / Notebook posts + `/api/predict` demo page | 🔜 Pending |
| **10–11** | **Security + Observability + Backup** | Security headers, rate limiting, Grafana ops dashboard, nightly `pg_dump` | 🔜 Pending |

---

## 🧰 Repository Structure

```
portfolio/
  apps/
    web/            # React app (Week 1)
    api/            # FastAPI service (Week 2)
  infra/
    compose/        # Docker Compose + envs
      .env
      .env.production
      .env.example
      docker-compose.yml
    nginx/          # Reverse proxy + security headers
      nginx.conf
      html/         # built React app for Nginx
  .github/workflows # CI/CD pipelines (Week 4+)
  Makefile          # optional helpers
  README.md
```

---

## ▶️ How to run

### Local (dev)
```bash
cd infra/compose
docker compose up -d                    # uses .env
# or
docker compose --env-file .env -f docker-compose.yml up -d
```

### Production (NAS)
```bash
cd /docker/portfolio
docker compose --env-file infra/compose/.env.production -f infra/compose/docker-compose.yml up -d --build
```

**Verify**
```bash
curl http://192.168.86.46:8080/api/health
curl -I http://192.168.86.46:8080
```

---

## ⚙️ Environment files

**infra/compose/.env.example**
```
PORTFOLIO_ENV=development
DOMAIN=localhost
HOST_HTTP_PORT=8080
HOST_API_PORT=8000
```

**infra/compose/.env.production**
```
PORTFOLIO_ENV=production
DOMAIN=jargonless.com
HOST_HTTP_PORT=8080
HOST_API_PORT=8000
```

---

## 🛡️ Security & headers (baseline)

Nginx sets baseline headers (can be expanded later):

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

CSP and rate limiting will be finalised in the **Security** milestone.

---

## 🌐 Production summary

- **Host:** Synology NAS DS1522+ (DSM 7.2.1-69057 Update 8, Docker 24.0.2-1543)
- **Path:** `/docker/portfolio`
- **LAN URLs:**  
  - Web: http://192.168.86.46:8080  
  - API: http://192.168.86.46:8000/api/health
- **Next:** Cloudflare Tunnel (DNS still at GoDaddy, migration to Cloudflare Free planned)

---

## 🧭 Terraform Stage (3.5)

- Manage Cloudflare DNS + Tunnel as code.  
- Optional Zero Trust Access for `/cms` and `/grafana`.  
- CI will trigger Terraform → deploy to NAS.

---

## 🧾 Notes

- **Parity by design:** the same Compose file runs locally and in production.  
- **No secrets in Git.** Use env files locally and GitHub Secrets in CI.  
- **Healthcheck:** Python-based internal test to ensure API readiness.  
- **Next milestone:** Week 4 — CI/CD automation via GitHub Actions.  

---

© 2025 William Reed · Jargonless · All rights reserved
