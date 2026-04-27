#!/usr/bin/env bash
# DECYPHER - ULTRA-QUICK START (copy-paste ready)

# 1️⃣  CLONE
git clone https://github.com/YOUR-USERNAME/decypher.git
cd decypher

# 2️⃣  LOCAL TEST (OPTIONAL - skip to step 3 for production)
cp .env.example .env
# Edit .env with your values (or leave defaults for local testing)
docker-compose up -d
# Wait 20 seconds, then visit http://localhost
# Login: admin@decypher.app / Admin@2024

# 3️⃣  DEPLOY TO PRODUCTION
git add . && git commit -m "Deploy to production" && git push origin main

# 4️⃣  RENDER SETUP (one-click, 10 min)
# Visit: https://render.com/dashboard
# Click: "New" → "Web Service"
# Select: Connect GitHub → decypher repo
# Render auto-detects render.yaml ✨
# Set env vars:
#   Jwt__Key = (openssl rand -base64 48)
#   OpenAI__ApiKey = your-openai-key
#   AllowedOrigins = your-frontend-url
# Click: "Create Web Service"
# DONE! ✅

# 5️⃣  VERIFY
# Frontend: https://decypher-frontend.onrender.com
# Backend API: https://decypher-api.onrender.com
# Health: https://decypher-api.onrender.com/health
# Login: same credentials as above

echo "✅ DECYPHER is now PRODUCTION-READY!"
echo "📊 Monitor at: https://dashboard.render.com"
echo "🎉 Your SaaS is live!"
