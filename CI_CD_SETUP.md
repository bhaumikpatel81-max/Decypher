# GitHub Actions Deploy Config

Automatically deploy every push to `main`.

**Required Secrets in GitHub:**
```
RENDER_API_KEY: your-render-api-key
RENDER_BACKEND_SERVICE_ID: your-backend-service-id
RENDER_FRONTEND_SERVICE_ID: your-frontend-service-id
RENDER_BACKEND_URL: https://decypher-api.onrender.com
RENDER_FRONTEND_URL: https://decypher-frontend.onrender.com
```

**File:** `.github/workflows/deploy.yml` (already created)

To get Render IDs:
1. Log into Render dashboard
2. Each service shows ID in URL: `https://dashboard.render.com/web/srv-xxxxx`
3. Use that `srv-xxxxx` as the SERVICE_ID

---

## CI/CD Pipeline Features
✅ Auto-build on push
✅ Multi-stage Docker builds (backend + frontend)
✅ Container registry push
✅ Deploy to Render
✅ Health check verification
✅ Zero-downtime deployment

Deploy via: `git push origin main` → **Automatically live in 5 minutes!**
