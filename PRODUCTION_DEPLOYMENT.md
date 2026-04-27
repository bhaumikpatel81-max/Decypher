# 🚀 DECYPHER - COMPLETE PRODUCTION DEPLOYMENT GUIDE

**Everything needed to deploy Decypher as a production-grade SaaS on a single URL, running 24/7 globally.**

---

## PHASE 1: LOCAL SETUP & TESTING (10 minutes)

### Prerequisites
- Docker & Docker Compose installed
- Git installed
- GitHub account (for CI/CD)
- Render account (hosting)
- OpenAI API key

### Step 1: Clone & Configure

```bash
git clone https://github.com/your-username/decypher.git
cd decypher
cp .env.example .env
```

### Step 2: Update `.env` with your values

```bash
# Database (leave as is for local Docker)
DB_PASSWORD=your-secure-password

# JWT Key (generate with: openssl rand -base64 48)
JWT_KEY=your-generated-48-char-key

# OpenAI
OPENAI_API_KEY=sk-your-key

# Environment
ENVIRONMENT=Development
DOMAIN=localhost
```

### Step 3: Run Locally with Docker

```bash
docker-compose up -d
```

**Services will be available at:**
- Frontend: http://localhost:80
- Backend API: http://localhost:80/api
- Health Check: http://localhost:80/health
- Postgres: localhost:5432

### Step 4: Database Seeding

Backend automatically creates tables and seeds demo data. Verify:

```bash
docker logs decypher-api | grep "Database initialized"
```

### Step 5: Test Login

1. Go to http://localhost
2. Login with:
   - Email: `admin@decypher.app`
   - Password: `Admin@2024`

### Step 6: Verify All Modules

- ✅ Dashboard loads
- ✅ Click through navigation
- ✅ Check Settings > Roles & Permissions
- ✅ Test API at http://localhost/api/health

---

## PHASE 2: PRODUCTION DEPLOYMENT (30 minutes)

### Option A: Deploy to Render.com (RECOMMENDED - Easiest)

**Render** is the simplest: one-click deployment, automatic SSL, no server management.

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

#### Step 2: Create Render.yaml

*Already provided in repo*. Render will auto-detect it.

#### Step 3: Connect GitHub to Render

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Select "Connect a repository"
4. Connect your GitHub account
5. Select `decypher` repo
6. Render will auto-detect render.yaml

#### Step 4: Configure Environment Variables

In Render dashboard for each service:

**Backend Service:**
```
Jwt__Key: [Generate new key]
OpenAI__ApiKey: [Your OpenAI key]
AllowedOrigins: https://decypher-frontend.onrender.com
```

**Frontend Service:**
```
API_URL: https://decypher-api.onrender.com
```

#### Step 5: Deploy

1. Render auto-builds from render.yaml
2. Databases are created automatically
3. Services deployed in order (DB → Backend → Frontend)

**Your public URLs:**
- Frontend: `https://decypher-frontend.onrender.com`
- Backend: `https://decypher-api.onrender.com`
- API: `https://decypher-api.onrender.com/api/`

---

### Option B: Deploy to Railway.app (FASTER - 15 min)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from Git"
3. Connect GitHub repo
4. Railway auto-configures services
5. Set environment variables
6. Deploy - your app is live in 5 minutes

**Railway URLs will be auto-generated.**

---

### Option C: Deploy to Fly.io (MOST CONTROL)

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Create app: `fly launch` (use provided fly.toml)
4. Deploy: `fly deploy`
5. View: `fly open`

---

## PHASE 3: CUSTOM DOMAIN & SSL

### Using Render:
1. Dashboard → Web Service → Settings
2. "Custom Domain" → Enter your domain (e.g., `decypher.app`)
3. Update DNS CNAME records (instructions provided)
4. SSL certificate auto-provisioned (90 days)

### Your production URL: `https://decypher.app`

---

## PHASE 4: MONITORING & HEALTH

### Health Check Endpoint

```bash
curl https://decypher.app/health
# Returns: { "status": "healthy" }
```

### View Logs

**Render:**
```bash
render logs --service decypher-api --follow
```

**Railway:**
```bash
railway logs --follow
```

**Fly.io:**
```bash
fly logs -a decypher
```

### Monitoring Checklist

- [ ] App starts successfully
- [ ] Database migrations run
- [ ] Demo accounts created
- [ ] Login works
- [ ] Dashboard loads data
- [ ] AI features call backend
- [ ] No 500 errors in logs

---

## PHASE 5: CI/CD AUTOMATION

### GitHub Actions (Automatic Deployment)

Every push to `main` triggers:
1. Run tests
2. Build Docker images
3. Push to registry
4. Deploy to Render

**Zero-touch deployments!**

---

## CRITICAL PRODUCTION CHECKLIST

### Security ✅

- [ ] JWT key is strong (generated)
- [ ] OpenAI key is secured (not in code)
- [ ] CORS is restricted to your domain
- [ ] HTTPS enabled globally
- [ ] Database SSL enabled
- [ ] No hardcoded credentials anywhere

### Performance ✅

- [ ] NGINX caching enabled
- [ ] Gzip compression enabled
- [ ] Database indexes created
- [ ] Connection pooling configured
- [ ] Static assets cached (1 year)

### Reliability ✅

- [ ] Health checks running
- [ ] Auto-restart enabled
- [ ] Database backups configured
- [ ] Error logging enabled
- [ ] Rate limiting enabled

### Compliance ✅

- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] GDPR compliance (if EU users)
- [ ] Data deletion workflow

---

## TROUBLESHOOTING

### Backend won't start

```bash
# Check logs
docker logs decypher-api

# Common issues:
# 1. Database connection string - verify in .env
# 2. JWT key missing - generate new one
# 3. Port already in use - change ASPNETCORE_URLS
```

### Frontend shows blank page

```bash
# Check browser console (F12)
# Common issues:
# 1. API_URL environment variable incorrect
# 2. CORS error - check AllowedOrigins
# 3. Backend not accessible
```

### Database errors

```bash
# Reset database
docker-compose down -v
docker-compose up

# This will recreate DB and seed demo data
```

### High latency / slow responses

```bash
# Check backend logs for slow queries
# Verify database connection pooling
# Check NGINX caching headers
```

---

## SCALING TO MILLIONS

Once profitable, upgrade to:

1. **Auto-scaling** - Render Pro with multiple replicas
2. **CDN** - Cloudflare for global edge caching
3. **Separate databases** - Read replicas for analytics
4. **Microservices** - Split AI service into separate container
5. **Caching layer** - Redis for session management

---

## SUCCESS METRICS

Track these in production:

| Metric | Target |
|--------|--------|
| Uptime | 99.9% (4 nines) |
| Response time (p50) | <200ms |
| Response time (p95) | <1000ms |
| Error rate | <0.1% |
| Database connections | < 80% of max |
| CPU usage | < 70% avg |

---

## CONTACT & SUPPORT

- **Documentation**: In this repo
- **Issues**: GitHub Issues
- **Render Support**: render.com/support
- **Railway Support**: railway.app/support

---

## NEXT STEPS

1. ✅ Deploy to Render (takes 10 minutes)
2. ✅ Test with custom domain
3. ✅ Add payment processing (Stripe)
4. ✅ Set up analytics (Mixpanel, Amplitude)
5. ✅ Create onboarding flow
6. ✅ Launch marketing website

**Your SaaS is now production-ready!** 🚀

---

*Last Updated: April 2026*
*Version: 1.0.0*
