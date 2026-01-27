#!/bin/bash
echo "Starting custom startup script..."
cd /home/site/wwwroot
echo "Current directory: $(pwd)"
echo "Files in directory:"
ls -la
echo "Starting Node.js application..."
NODE_ENV=production node app.js