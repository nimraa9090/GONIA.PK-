# Goniaa Fashion Backend - Simple & Bulletproof

**Minimal Express + MongoDB backend that deploys instantly on Back4App**

## ✅ Why This Works

- No TypeScript compilation issues
- No build step required
- Pure Node.js/Express
- Minimal dependencies
- Works immediately on Back4App

## 🚀 Quick Start

### Local Testing
```bash
npm install
cp .env.example .env
# Add your MONGODB_URI to .env
npm start
```

### Deploy to Back4App

1. **Create Back4App App**
   - Go to back4app.com
   - Create new app "goniaa-fashion"

2. **Get MongoDB Connection**
   - Dashboard → Database → MongoDB
   - Copy connection string

3. **Connect GitHub**
   - Push this code to GitHub
   - Back4App → Hosting → Deploy from GitHub
   - Select this repository

4. **Set Build Command**
   ```
   npm install
   ```

5. **Set Start Command**
   ```
   npm start
   ```

6. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://...
   DATABASE_URL=mongodb+srv://...
   PORT=3000
   NODE_ENV=production
   ```

7. **Deploy**
   - Click Deploy
   - Wait 2-3 minutes
   - Your backend is live!

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Categories
```
GET /api/categories
POST /api/categories
```

### Products
```
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Orders
```
GET /api/orders
POST /api/orders
PUT /api/orders/:id
```

### Brand Settings
```
GET /api/brand-settings
PUT /api/brand-settings
```

## 🔧 Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| MONGODB_URI | Yes | mongodb+srv://user:pass@cluster.mongodb.net/db |
| DATABASE_URL | Yes | Same as MONGODB_URI |
| PORT | No | 3000 |
| NODE_ENV | No | production |

## ✅ Verified Working

- ✓ Tested locally
- ✓ No build errors
- ✓ MongoDB compatible
- ✓ Back4App ready
- ✓ CORS enabled
- ✓ Error handling included

## 🆘 Troubleshooting

**MongoDB connection fails**
- Verify MONGODB_URI is correct
- Check username/password
- Ensure IP whitelist includes Back4App

**Port error**
- Back4App automatically assigns PORT
- Don't hardcode port in code

**CORS error**
- CORS is enabled for all origins
- Update if needed in server.js

## 📞 Support

This is a minimal, bulletproof backend. If it doesn't work:
1. Check MongoDB connection string
2. Verify environment variables
3. Check Back4App logs
4. Ensure Node.js version is compatible

**This backend is guaranteed to deploy on Back4App without errors.**
