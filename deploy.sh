#!/bin/bash

# Portfolio Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting Portfolio Deployment..."

# Configuration
IMAGE_NAME="rfqrenaldo/portfolio-backend"
CONTAINER_NAME="portfolio-backend"
PORT="3000"

# Pull latest image
echo "📦 Pulling latest Docker image..."
docker pull $IMAGE_NAME:latest

# Stop existing container
echo "🛑 Stopping existing container..."
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Run new container
echo "▶️ Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p 80:$PORT \
  $IMAGE_NAME:latest

# Clean up
echo "🧹 Cleaning up old images..."
docker image prune -f

# Health check
echo "🏥 Health check..."
sleep 5
if docker ps | grep -q $CONTAINER_NAME; then
  echo "✅ Deployment successful!"
  echo "🌐 Portfolio is running on http://your-server-ip"
else
  echo "❌ Deployment failed!"
  exit 1
fi