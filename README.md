# 🧠 Jargonless Portfolio — Week 1 Coming Soon

![Build](https://img.shields.io/github/actions/workflow/status/jargonless-website/jargonless-portfolio/ci-week1.yml?label=Build&logo=github)
![React](https://img.shields.io/badge/Frontend-React%2018-61dafb?logo=react)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS%20via%20CDN-38bdf8?logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)
![Docker Compose](https://img.shields.io/badge/Infra-Docker%20Compose-blue?logo=docker)
![License](https://img.shields.io/badge/License-Private-darkred)

**Self-hosted analytics and machine-learning portfolio**, following the official Jargonless Blueprint.

_Last updated: October 2025_

---

## 🧩 What is here

- ✅ **React + Vite Coming Soon app** (Week 1 milestone)
  - Responsive landing page with Jargonless logo, Tailwind CDN, and live reload
  - Basic form and cards ready for later content binding
  - Uses real `favicon.png` (32×32) and `logo-1024.png` for page and preview
- FastAPI service placeholder with `/api/health`
- Nginx reverse-proxy configuration (prep for Week 2)
- Docker Compose skeleton for parity between local and NAS
- Makefile shortcuts for stack management

```bash
make up        # start local stack (Week 2+)
make down      # stop
make restart   # rebuild and restart
```

Local preview of the React app:

```
cd apps/web
npm run dev
# open http://localhost:5173
```

---

## 📅 Project Roadmap

| Week | Milestone | Description | Status |
|------|------------|-------------|---------|
| **0** | **Repo & Skeleton** | GitHub monorepo, FastAPI / Nginx / Compose / CI baseline | ✅ Completed |
| **1** | **React Coming Soon** | Vite + React app, Tailwind CDN, favicon + logo integrated, local dev working | ✅ **Completed** |
| **2** | **IaC Baseline** | Add Compose stack (Nginx + API), validate local parity | 🔜 Pending |
| **3** | **Production Launch** | Deploy Coming Soon site via Cloudflare Tunnel on NAS | 🔜 Pending |
| **4** | **CI/CD Automation** | Push → build → deploy to NAS (SSH runner) | 🔜 Pending |
| **5** | **Strapi Integration** | CMS setup with post type enum (Power BI / Grafana / Notebook / ML) | 🔜 Pending |
| **6–9** | **Content Embeds & ML Demo** | Power BI / Grafana / Notebook posts + predict endpoint demo | 🔜 Pending |
| **10–11** | **Security + Observability + Backup** | Headers, rate limits, Grafana ops dash, nightly pg_dump | 🔜 Pending |

---

## 🧰 Repository Structure

```
portfolio/
  apps/
    web/            # React Coming Soon (Week 1)
      public/
        favicon.png
        logo-1024.png
      src/
        App.jsx
        main.jsx
    api/            # FastAPI service (Week 2+)
  infra/
    compose/        # Docker Compose + envs
    nginx/          # Reverse proxy + CSP headers
  .github/workflows # CI/CD pipelines
  Makefile
  README.md
```

---

## 🧾 Notes

- **Week 1 Focus:** local frontend foundation (no backend or Docker yet)
- **Next:** add FastAPI + Nginx Compose stack (Week 2)
- **No secrets in Git** — use `.env` and GitHub Secrets
- **Parity by design:** same Compose will run locally and on NAS
- **IaC principle:** every environment declaratively deployed via CI/CD

---

© 2025 William Reed · Jargonless · All rights reserved
