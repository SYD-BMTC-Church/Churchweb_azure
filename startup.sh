#!/bin/bash
echo "Starting custom deployment script..."
cd /home/site/wwwroot

echo "Current directory: $(pwd)"
echo "Files in directory:"
ls -la

echo "Installing dependencies..."
npm install --production

echo "Verifying next module installation..."
ls -la node_modules/next/ | head -5

echo "Starting Node.js application..."
NODE_ENV=production node app.js