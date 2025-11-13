# 🎯 Portfolio Backend Developer - CI/CD Setup Guide

## 🚀 Automated Deployment Pipeline

Setiap kali Anda push ke branch `main`, sistem otomatis akan:
1. Build aplikasi React 
2. Create Docker image
3. Push ke Docker Hub
4. Deploy ke VPS/Cloud Server

## ⚙️ Setup Requirements

### 1. Docker Hub Account
- Buat account di [Docker Hub](https://hub.docker.com/)
- Buat repository: `rfqrenaldo/portfolio-backend`

### 2. GitHub Secrets
Tambahkan secrets di GitHub Repository Settings > Secrets and variables > Actions:

```
DOCKER_USERNAME=rfqrenaldo
DOCKER_PASSWORD=your_docker_hub_token
VPS_HOST=your_server_ip
VPS_USERNAME=your_ssh_username  
VPS_SSH_KEY=your_private_ssh_key
VPS_PORT=22
```

### 3. VPS/Server Setup
Install Docker di server:
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER
```

## 🔄 Deployment Workflow

### Automatic (Recommended)
```bash
# Setiap push ke main akan auto-deploy
git add .
git commit -m "Update portfolio features"
git push origin main
```

### Manual Deployment
```bash
# Build dan run locally
docker build -t portfolio-backend .
docker run -d -p 3000:3000 --name portfolio portfolio-backend

# Deploy ke server
./deploy.sh
```

## 🐳 Docker Commands

```bash
# Build image
docker build -t rfqrenaldo/portfolio-backend .

# Run container
docker run -d -p 80:3000 --name portfolio-backend rfqrenaldo/portfolio-backend

# View logs
docker logs portfolio-backend

# Stop container
docker stop portfolio-backend

# Remove container
docker rm portfolio-backend
```

## 🌐 Environment Variables

Create `.env` file for local development:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 📝 Development Workflow

1. Make changes to code
2. Test locally: `npm run dev`
3. Commit changes: `git add . && git commit -m "feature description"`
4. Push to GitHub: `git push origin main`
5. CI/CD automatically deploys to production

## 🔧 Troubleshooting

### Build Issues
- Check GitHub Actions tab for build logs
- Verify Docker Hub credentials
- Ensure all dependencies in package.json

### Deployment Issues  
- Check VPS SSH connection
- Verify Docker is running on server
- Check server logs: `docker logs portfolio-backend`

### SSL Setup (Optional)
- Get SSL certificate (Let's Encrypt recommended)
- Update nginx.conf with SSL configuration
- Restart nginx container