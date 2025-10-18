# Jargonless Portfolio — Week 0 Skeleton

Monorepo skeleton for the Jargonless portfolio, matching the Blueprint.

## What is here

- FastAPI service with `/api/health`
- Nginx serving a placeholder page and reverse-proxying `/api`
- Docker Compose for local dev
- Minimal CI that validates Compose and builds the API image

## Run locally

```bash
make up
# Homepage: http://localhost:8080
# Health:   http://localhost:8080/api/health
```

Stop everything:
```bash
make down
```

## Next steps (Week 1–4)
- Add React + Vite app in `apps/web`
- Wire Nginx to serve the built SPA
- Add GitHub Actions deploy to NAS via SSH
