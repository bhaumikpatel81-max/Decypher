#!/usr/bin/env bash
# 🚀 DECYPHER ONE-COMMAND DEPLOYMENT
# Usage: bash deploy.sh render|railway|local

set -e

DEPLOY_TO=${1:-render}

echo "🚀 DECYPHER Deployment Script"
echo "=============================="

case $DEPLOY_TO in
  render)
    echo "📦 Deploying to Render..."
    echo ""
    echo "1. Ensure you have a GitHub repo:"
    echo "   git add . && git commit -m 'Deploy to Render' && git push"
    echo ""
    echo "2. Go to https://render.com/dashboard"
    echo "3. Click 'New' → 'Web Service'"
    echo "4. Connect your GitHub repository"
    echo "5. Render auto-detects render.yaml"
    echo "6. Configure these environment variables:"
    echo "   - Jwt__Key: (generate with: openssl rand -base64 48)"
    echo "   - OpenAI__ApiKey: (your OpenAI API key)"
    echo "   - AllowedOrigins: https://your-frontend-url.onrender.com"
    echo ""
    echo "7. Click 'Deploy'"
    echo "8. Your app will be live in 5-10 minutes!"
    echo ""
    echo "✅ Done! Monitor at: https://dashboard.render.com"
    ;;

  railway)
    echo "📦 Deploying to Railway..."
    echo ""
    echo "1. Go to https://railway.app"
    echo "2. Click 'New Project' → 'Deploy from Git'"
    echo "3. Select your GitHub repository"
    echo "4. Set environment variables (same as Render)"
    echo "5. Railway auto-deploys"
    echo ""
    echo "✅ Done! Your app is live in ~5 minutes"
    ;;

  local)
    echo "🐳 Running locally with Docker..."
    echo ""
    echo "Prerequisites: Docker, Docker Compose"
    echo ""
    echo "1. Copy environment template:"
    cp -i .env.example .env || true
    echo ""
    echo "2. Update .env with your values:"
    echo "   - DB_PASSWORD=your-password"
    echo "   - JWT_KEY=your-generated-key"
    echo "   - OPENAI_API_KEY=your-key"
    echo ""
    echo "3. Start services:"
    docker-compose up -d
    echo ""
    echo "4. Wait for databases to initialize (10-20 seconds)..."
    sleep 15
    echo ""
    echo "✅ All services running!"
    echo "   Frontend: http://localhost"
    echo "   Backend API: http://localhost/api"
    echo "   Health: http://localhost/health"
    echo ""
    echo "Login with:"
    echo "   Email: admin@decypher.app"
    echo "   Password: Admin@2024"
    echo ""
    echo "View logs:"
    echo "   docker-compose logs -f backend"
    echo "   docker-compose logs -f frontend"
    echo ""
    echo "Stop all:"
    echo "   docker-compose down"
    ;;

  *)
    echo "❌ Unknown deployment target: $DEPLOY_TO"
    echo "Usage: bash deploy.sh [render|railway|local]"
    exit 1
    ;;
esac
