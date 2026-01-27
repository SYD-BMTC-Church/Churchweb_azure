#!/bin/bash

# Exit on any error
set -e

echo "Starting custom deployment script..."

# Navigate to deployment directory
cd $DEPLOYMENT_TARGET

echo "Installing dependencies..."
npm install --production

echo "Deployment completed successfully!"