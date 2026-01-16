#!/bin/bash

# Exit on error
set -e

PROJECT_DIR="/root/LJF"
REPO_URL="https://github.com/tela1021/LJF.git"

echo "--- Starting Deployment of LJF Project ---"

# 1. Check prerequisites
echo "Step 1: Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed."
    exit 1
fi

# 2. Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "Step 2: Installing PM2 globally..."
    npm install -g pm2
else
    echo "Step 2: PM2 already installed."
fi

# 3. Clone or pull repository
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Step 3: Cloning repository into $PROJECT_DIR..."
    git clone $REPO_URL $PROJECT_DIR
else
    echo "Step 3: Updating existing repository in $PROJECT_DIR..."
    cd $PROJECT_DIR
    git pull origin main
fi

cd $PROJECT_DIR

# 4. Install dependencies
echo "Step 4: Installing dependencies..."
npm install

# 5. Setup Database (Prisma)
echo "Step 5: Setting up Prisma (generate client and push schema)..."
npx prisma generate
npx prisma db push

# 6. Build the project
echo "Step 6: Building Next.js project..."
npm run build

# 7. Start or restart with PM2
echo "Step 7: Starting application with PM2..."
pm2 delete ljf 2>/dev/null || true
pm2 start npm --name "ljf" -- start

echo "--- Deployment Complete ---"
echo "Application should be accessible at http://$(curl -s ifconfig.me):3000"
