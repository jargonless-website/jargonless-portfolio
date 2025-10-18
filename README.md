# 🧠 Jargonless Portfolio — Week 0 Skeleton

![Build](https://img.shields.io/github/actions/workflow/status/jargonless-website/jargonless-portfolio/ci-week0.yml?label=Build&logo=github)
![Docker Compose](https://img.shields.io/badge/Infra-Docker%20Compose-blue?logo=docker)
![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)
![License](https://img.shields.io/badge/License-Private-darkred)

**Monorepo skeleton for the Jargonless portfolio**, matching the Blueprint for a self-hosted analytics and machine learning platform.

_Last updated: October 2025_

---

## 🧩 What is here

- FastAPI service with `/api/health`
- Nginx serving a placeholder page and reverse-proxying `/api`
- Docker Compose for local development
- Makefile for up / down / restart shortcuts
- Minimal CI that validates Compose and builds the API image

```bash
make up        # start local stack
make down      # stop
make restart   # rebuild and restart
```

Visit:
- 🌐 [http://localhost:8080](http://localhost:8080)
- 🌐 [http://localhost:8080/api/health](http://localhost:8080/api/health)

---

## 📅 Project Roadmap

| Week | Milestone | Description | Status |
|------|------------|--------------|---------|
| **0** | **Repo & Skeleton** | GitHub monorepo, FastAPI / Nginx / Docker Compose / Makefile / CI pipeline baseline | ✅ **Completed** |
| **1** | **React Coming Soon** | Add Vite + React app, build static assets, serve via Nginx | ⏳ Next |
| **2** | **IaC Baseline** | Validate Compose with Postgres + Nginx + API; prep for production parity | 🔜 Pending |
| **3** | **Production Launch** | Deploy Coming Soon site via Cloudflare Tunnel on NAS | 🔜 Pending |
| **4** | **CI/CD Automation** | Push to main triggers build + deploy to NAS (SSH runner) | 🔜 Pending |
| **5** | **Strapi Integration** | Set up CMS (Post type enum: Power BI, Grafana, Notebook, ML) | 🔜 Pending |
| **6–9** | **Content Embeds & ML Demo** | Power BI, Grafana, Notebook posts + predict endpoint demo | 🔜 Pending |
| **10–11** | **Security + Observability + Backup** | Headers, rate limiting, Grafana ops dashboard, nightly dumps | 🔜 Pending |

---

## 🧰 Repository Structure

```
portfolio/
  apps/
    web/            # React app (Week 1)
    api/            # FastAPI app
  infra/
    compose/        # Docker Compose + envs
    nginx/          # Reverse proxy + static assets
  .github/workflows # CI/CD pipelines
  Makefile
  README.md
```

---

## 🧾 Notes

- **No secrets in Git** – local `.env` files and GitHub Secrets handle credentials.
- **Parity by design** – same Compose runs locally and on the NAS.
- **IaC principle** – every environment is declaratively defined and deployed via CI/CD.

---

© 2025 William Reed · Jargonless · All rights reserved.