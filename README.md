# 🧠 Jargonless Portfolio — Week 2 IaC Baseline

![Build](https://img.shields.io/github/actions/workflow/status/jargonless-website/jargonless-portfolio/ci-week2.yml?label=Build&logo=github)
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
- ✅ **Docker Compose stack** (`nginx` + `api`) with a shared network and ports `80` (web) and `8000` (api)
- ✅ **Healthcheck** for `api` using Python `urllib.request` (so `nginx` waits until API is ready)
- ✅ **Environment files** under `infra/compose`: `.env`, `.env.production`, `.env.example`
- ✅ **Makefile helpers** (optional) for `dev`, `prod`, `down`, `logs`

> **Local endpoints**
> - Web (Nginx): http://localhost  
> - API (proxied): http://localhost/api/health → `{"ok": true}`  
> - API direct: http://localhost:8000/api/health

---

## 📅 Project Roadmap (per Blueprint)

| Week | Milestone | Description | Status |
|------|-----------|-------------|--------|
| **0** | **Repo & Skeleton** | Monorepo + base layout | ✅ Completed |
| **1** | **React Coming Soon** | Vite + React app, Tailwind CDN, favicon + logo integrated | ✅ Completed |
| **2** | **IaC Baseline** | Compose stack (Nginx + API) validated locally + healthchecks + env files | ✅ **Completed** |
| **3** | **Production Launch** | Deploy the stack on Synology NAS; expose via Cloudflare Tunnel | 🔜 Pending |
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
      public/
        favicon.png
        logo-1024.png
      src/
        App.jsx
        main.jsx
    api/            # FastAPI service (Week 2)
      Dockerfile
      main.py
  infra/
    compose/        # Docker Compose + envs
      .env
      .env.production
      .env.example
      docker-compose.yml
    nginx/          # Reverse proxy + security headers
      nginx.conf
      html/
        index.html  # served by Nginx
  .github/workflows # CI/CD pipelines (Week 4+)
  Makefile          # optional helpers
  README.md
```

---

## ▶️ How to run (local)

```bash
# Option A: with Makefile helpers
make dev      # starts with .env
make down     # stop everything
make logs     # tail logs

# Option B: raw Docker Compose
cd infra/compose
docker compose up -d                    # uses .env
# OR force production env locally for testing:
docker compose --env-file .env.production up -d
```

**Verify**
```bash
curl http://localhost/api/health
curl -I http://localhost/
```

---

## ⚙️ Environment files

All live in `infra/compose/`:

- `.env` (local defaults)
  ```ini
  PORTFOLIO_ENV=development
  DOMAIN=localhost
  ```

- `.env.production` (NAS)
  ```ini
  PORTFOLIO_ENV=production
  DOMAIN=jargonless.com
  ```

- `.env.example` (committed for documentation)

> Use `--env-file` to target a specific one:
> ```bash
> docker compose --env-file .env.production up -d
> ```

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

## 🌐 Production (preview of Stage 3)

- Host the same Compose stack on the Synology NAS.
- Add a `cloudflared` container for a Cloudflare Tunnel.
- Map public routes → Nginx (`/`), and later `/cms`, `/grafana`, etc.
- Keep admin paths behind authentication (Zero Trust).

---

## 🧭 Terraform Stage (3.5) — scope

- Manage Cloudflare **DNS** records and **Tunnel** as code.
- Optional Cloudflare Zero Trust Access policies for `/cms` and `/grafana`.
- CI will run: `terraform init/plan/apply` → then `docker compose up -d` on NAS.

---

## 🧾 Notes

- **Parity by design:** the same Compose file runs locally and on NAS.
- **No secrets in Git.** Use environment files locally and GitHub Secrets in CI.
- **Healthcheck:** implemented using Python in the API container to avoid extra packages.
- **Next concrete step:** Stage 3 — Deploy on NAS via Cloudflare Tunnel.

---

© 2025 William Reed · Jargonless · All rights reserved
