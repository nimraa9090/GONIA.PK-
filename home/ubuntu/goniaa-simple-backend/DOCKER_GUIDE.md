# 🐳 Docker Deployment Guide for Goniaa Backend

**Complete guide to deploy your backend using Docker on Back4App, Railway, Render, or any Docker-compatible platform.**

---

## 📋 WHAT'S INCLUDED

- ✅ **Dockerfile** - Production-ready Node.js container
- ✅ **.dockerignore** - Optimized build (excludes unnecessary files)
- ✅ **docker-compose.yml** - Local development setup
- ✅ **Health checks** - Automatic container health monitoring

---

## 🚀 QUICK START - LOCAL TESTING

### Prerequisites
- Docker installed (download from docker.com)
- MongoDB connection string ready

### Step 1: Create .env file
```bash
cp .env.example .env
# Edit .env and add your MONGODB_URI
```

### Step 2: Build Docker image
```bash
docker build -t goniaa-backend .
```

### Step 3: Run container locally
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/goniaa" \
  -e DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/goniaa" \
  goniaa-backend
```

### Step 4: Test
Open in browser: `http://localhost:3000/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Backend is running"
}
```

---

## 🐳 USING DOCKER COMPOSE (RECOMMENDED FOR LOCAL)

### Step 1: Create .env file
```bash
cp .env.example .env
```

### Step 2: Add your MongoDB URI to .env
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/goniaa?retryWrites=true&w=majority
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/goniaa?retryWrites=true&w=majority
```

### Step 3: Start with docker-compose
```bash
docker-compose up
```

### Step 4: Stop
```bash
docker-compose down
```

---

## 🚀 DEPLOY TO BACK4APP WITH DOCKER

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Add Docker support"
git remote add origin https://github.com/YOUR_USERNAME/goniaa-backend.git
git push -u origin main
```

### Step 2: Back4App Setup
1. Create app at back4app.com
2. Go to Hosting → Deploy from GitHub
3. Select your repository
4. Back4App will automatically detect Dockerfile

### Step 3: Configure Environment
1. Settings → Environment Variables
2. Add:
   ```
   MONGODB_URI=mongodb+srv://...
   DATABASE_URL=mongodb+srv://...
   PORT=3000
   NODE_ENV=production
   ```

### Step 4: Deploy
- Click Deploy
- Wait 3-5 minutes
- Your backend is live!

---

## 🚀 DEPLOY TO RAILWAY WITH DOCKER

### Step 1: Connect GitHub
1. Go to railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Authorize and select repository

### Step 2: Add Environment Variables
1. Project Settings → Variables
2. Add MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://...
   DATABASE_URL=mongodb+srv://...
   ```

### Step 3: Deploy
- Railway automatically detects Dockerfile
- Deployment starts automatically
- Get your URL from dashboard

---

## 🚀 DEPLOY TO RENDER WITH DOCKER

### Step 1: Create Render Account
- Go to render.com
- Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +"
2. Select "Web Service"
3. Select your GitHub repository
4. Name: `goniaa-backend`

### Step 3: Configure
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

### Step 4: Environment Variables
- Add MongoDB connection string
- Add other required variables

### Step 5: Deploy
- Click "Create Web Service"
- Render builds and deploys automatically

---

## 📊 DOCKER IMAGE DETAILS

| Property | Value |
|----------|-------|
| Base Image | node:18-alpine |
| Size | ~150MB |
| Port | 3000 |
| Health Check | Every 30 seconds |
| Restart Policy | unless-stopped |

---

## 🔧 BUILD DOCKER IMAGE MANUALLY

### Build
```bash
docker build -t goniaa-backend:latest .
```

### Tag for registry
```bash
docker tag goniaa-backend:latest your-registry/goniaa-backend:latest
```

### Push to registry
```bash
docker push your-registry/goniaa-backend:latest
```

---

## 📝 DOCKERFILE EXPLANATION

```dockerfile
# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Health check - ensures container is healthy
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["npm", "start"]
```

---

## 🆘 TROUBLESHOOTING

### Docker build fails
```bash
# Clean build
docker build --no-cache -t goniaa-backend .
```

### Container won't start
```bash
# Check logs
docker logs <container-id>

# Run with interactive terminal
docker run -it goniaa-backend
```

### MongoDB connection fails
- Verify MONGODB_URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure connection string includes credentials

### Port already in use
```bash
# Use different port
docker run -p 3001:3000 goniaa-backend
```

### Container keeps restarting
- Check logs: `docker logs <container-id>`
- Verify environment variables are set
- Check MongoDB connection

---

## 📦 DOCKER HUB (OPTIONAL)

### Push to Docker Hub
```bash
# Login
docker login

# Tag image
docker tag goniaa-backend:latest yourusername/goniaa-backend:latest

# Push
docker push yourusername/goniaa-backend:latest

# Others can now pull
docker pull yourusername/goniaa-backend:latest
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Dockerfile created
- [ ] .dockerignore created
- [ ] docker-compose.yml created
- [ ] Local Docker test successful
- [ ] Code pushed to GitHub
- [ ] Deployed to Back4App/Railway/Render
- [ ] Health check endpoint responding
- [ ] API endpoints working
- [ ] MongoDB connected

---

## 🎯 NEXT STEPS

1. ✅ Test locally with Docker
2. ✅ Push to GitHub
3. ✅ Deploy to Back4App (or Railway/Render)
4. ✅ Get backend URL
5. ✅ Update web app's API URL
6. ✅ Go live!

---

## 📞 QUICK COMMANDS

```bash
# Build image
docker build -t goniaa-backend .

# Run container
docker run -p 3000:3000 goniaa-backend

# Run with environment file
docker run --env-file .env -p 3000:3000 goniaa-backend

# Run in background
docker run -d -p 3000:3000 goniaa-backend

# View logs
docker logs <container-id>

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Docker compose up
docker-compose up

# Docker compose down
docker-compose down

# Docker compose logs
docker-compose logs -f
```

---

## ✨ YOU'RE READY!

Your backend is now Docker-ready and can be deployed anywhere that supports Docker containers:
- ✅ Back4App
- ✅ Railway
- ✅ Render
- ✅ AWS
- ✅ Google Cloud
- ✅ Azure
- ✅ DigitalOcean
- ✅ Any Docker-compatible platform

**Deploy with confidence!** 🚀
