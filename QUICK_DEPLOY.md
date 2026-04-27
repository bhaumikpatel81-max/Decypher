# 🚀 QUICK START - PRODUCTION DEPLOYMENT

## Local Testing (5 min)
```bash
git clone https://github.com/your-username/decypher.git
cd decypher
cp .env.example .env
docker-compose up -d
# Visit http://localhost → Login with admin@decypher.app / Admin@2024
```

## Deploy to Render (10 min - EASIEST)
1. Push to GitHub: `git push`
2. Go to https://render.com → "New" → "Web Service"
3. Connect GitHub repo → Select `decypher`
4. Render auto-detects render.yaml
5. Set: `OpenAI__ApiKey`, `AllowedOrigins`
6. **Done!** Your app is live at `https://decypher-frontend.onrender.com`

## Alternative: Railway (5 min - FASTEST)
1. Go to https://railway.app
2. "New Project" → "Deploy from Git"
3. Select GitHub repo
4. Set environment variables
5. Deploy - **Done in 5 minutes!**

## Custom Domain
1. Render Dashboard → "Custom Domain"
2. Add your domain (e.g., `decypher.app`)
3. Update DNS CNAME
4. SSL auto-provisioned

## Production Checklist
- [ ] Backend health check: `curl https://your-domain/health`
- [ ] Login works
- [ ] Dashboard loads
- [ ] AI features respond
- [ ] No 500 errors in logs
- [ ] Database backups enabled

**Your SaaS is production-ready! 🎉**
