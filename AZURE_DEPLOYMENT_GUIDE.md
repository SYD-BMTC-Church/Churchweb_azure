# Azure App Service Deployment Guide for Next.js

This guide documents the complete working solution for deploying a Next.js application to Azure App Service on Linux.

## Overview

This deployment approach uses GitHub Actions to build and deploy a Next.js application to Azure App Service, including all dependencies and build artifacts.

## Prerequisites

1. Azure App Service (Linux) with Node.js runtime
2. GitHub repository with your Next.js application
3. Azure App Service publish profile configured as GitHub secret

## Required Files

### 1. `app.js` - Custom Entry Point

Create this file in your project root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')
const fs = require('fs')

// Set the working directory to the current directory
process.chdir(__dirname)

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT, 10) || 3000

console.log('Starting Next.js application...')
console.log('Working directory:', process.cwd())
console.log('Environment:', process.env.NODE_ENV)
console.log('Port:', port)
console.log('Hostname:', hostname)

// Debug: Check if .next directory and key files exist
console.log('\n=== Debugging .next directory ===')
const nextDir = path.join(__dirname, '.next')
console.log('.next directory exists:', fs.existsSync(nextDir))

if (fs.existsSync(nextDir)) {
  console.log('.next directory contents:', fs.readdirSync(nextDir))
  
  const buildIdPath = path.join(nextDir, 'BUILD_ID')
  console.log('BUILD_ID exists:', fs.existsSync(buildIdPath))
  if (fs.existsSync(buildIdPath)) {
    console.log('BUILD_ID content:', fs.readFileSync(buildIdPath, 'utf8').trim())
  }
  
  const buildManifestPath = path.join(nextDir, 'build-manifest.json')
  console.log('build-manifest.json exists:', fs.existsSync(buildManifestPath))
  
  const serverDir = path.join(nextDir, 'server')
  console.log('server directory exists:', fs.existsSync(serverDir))
  if (fs.existsSync(serverDir)) {
    console.log('server directory contents:', fs.readdirSync(serverDir))
  }
}

console.log('\n=== Root directory contents ===')
console.log('Root files:', fs.readdirSync(__dirname).filter(f => !f.startsWith('node_modules')))

// Create Next.js app with explicit configuration
const app = next({ 
  dev, 
  hostname, 
  port,
  dir: __dirname,
  conf: {
    distDir: '.next'
  }
})
const handle = app.getRequestHandler()

console.log('\nPreparing Next.js application...')

app.prepare().then(() => {
  console.log('Next.js application prepared successfully')
  
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
  .once('error', (err) => {
    console.error('Server error:', err)
    process.exit(1)
  })
  .listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
}).catch((err) => {
  console.error('Failed to prepare Next.js application:', err)
  console.error('Error details:', err.message)
  process.exit(1)
})
```

### 2. `web.config` - IIS Configuration

Create this file in your project root:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="app.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^app\.js\/debug[\/]?" />
        </rule>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="app.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <hiddenSegments>
          <remove segment="bin"/>
        </hiddenSegments>
      </requestFiltering>
    </security>
    <httpErrors existingResponse="PassThrough" />
    <iisnode 
      watchedFiles="web.config;*.js"
      node_env="production"
      nodeProcessCountPerApplication="1"
      maxConcurrentRequestsPerProcess="1024"
      maxNamedPipeConnectionRetry="3"
      namedPipeConnectionRetryDelay="2000"
      maxNamedPipeConnectionPoolSize="512"
      maxNamedPipePooledConnectionAge="30000"
      asyncCompletionThreadCount="0"
      initialRequestBufferSize="4096"
      maxRequestBufferSize="65536"
      uncFileChangesPollingInterval="5000"
      gracefulShutdownTimeout="60000"
      loggingEnabled="true"
      logDirectoryNameSuffix="logs"
      debuggingEnabled="false"
      debuggerPortRange="5058-6058"
      debuggerPathSegment="debug"
      maxLogFileSizeInKB="128"
      appendToExistingLog="false"
      logFileFlushInterval="5000"
      devErrorsEnabled="false"
      flushResponse="false"
      enableXFF="false"
      promoteServerVars=""
    />
  </system.webServer>
</configuration>
```

### 3. `.github/workflows/azure-app-service.yml` - GitHub Actions Workflow

Create this file in `.github/workflows/`:

```yaml
name: Build and deploy Node.js app to Azure Web App

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v4
        with:
          node-version: '22.x'

      - name: npm install and build
        run: |
          npm install
          npm run build

      - name: Prepare deployment package with dependencies
        run: |
          # Create deployment directory
          mkdir -p ./deployment
          # Verify .next directory exists before copying
          echo "=== Verifying .next directory before copy ==="
          ls -la .next/ | head -10
          echo "BUILD_ID content:"
          cat .next/BUILD_ID
          # Copy source files and built application
          cp -r .next ./deployment/
          cp -r public ./deployment/
          cp -r src ./deployment/
          cp -r node_modules ./deployment/
          cp package*.json ./deployment/
          cp next.config.ts ./deployment/
          cp tsconfig.json ./deployment/
          cp tailwind.config.ts ./deployment/
          cp postcss.config.mjs ./deployment/
          cp components.json ./deployment/
          cp web.config ./deployment/
          cp app.js ./deployment/
          # Update package.json to use our custom app.js entry point and set NODE_ENV
          sed -i 's/"start": "next start"/"start": "NODE_ENV=production node app.js"/' ./deployment/package.json
          # Copy environment template if it exists (Azure will use environment variables from portal)
          if [ -f ".env.local" ]; then
            cp .env.local ./deployment/
            echo "Copied .env.local template"
          else
            echo "No .env.local found - Azure will use portal environment variables"
          fi
          # Verify the structure in detail
          echo "=== Deployment structure ==="
          ls -la ./deployment/
          echo "=== .next directory structure ==="
          ls -la ./deployment/.next/
          echo "=== .next/server directory ==="
          ls -la ./deployment/.next/server/ | head -10
          echo "=== BUILD_ID file ==="
          cat ./deployment/.next/BUILD_ID
          echo "=== build-manifest.json exists ==="
          ls -la ./deployment/.next/build-manifest.json
          echo "=== Updated Package.json content ==="
          cat ./deployment/package.json | grep -A 5 -B 5 '"start"'
          echo "=== App.js exists ==="
          ls -la ./deployment/app.js
          echo "=== Node modules/next exists ==="
          ls -la ./deployment/node_modules/next/ | head -5 || echo "Next module not found"
          echo "=== Total deployment size ==="
          du -sh ./deployment/

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: ./deployment
          include-hidden-files: true

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'Production'
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: node-app

      - name: Verify downloaded artifact contents
        run: |
          echo "=== Downloaded artifact contents ==="
          ls -la .
          echo "=== Check if .next directory exists in artifact ==="
          if [ -d ".next" ]; then
            echo ".next directory found in artifact"
            ls -la .next/ | head -10
            echo "BUILD_ID in artifact:"
            cat .next/BUILD_ID
          else
            echo ".next directory NOT found in artifact"
          fi

      - name: 'Deploy to Azure Web App'
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'YOUR_APP_SERVICE_NAME'
          slot-name: 'Production'
          publish-profile: ${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE_YOUR_SECRET }}
          package: .
```

## Next.js Configuration

### 4. `next.config.ts` - Next.js Configuration

Ensure your Next.js config does NOT use standalone mode:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // DO NOT USE: output: 'standalone',
  images: {
    domains: ["drive.google.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-domain.com",
        pathname: "/path/**",
      },
    ],
  },
};

export default nextConfig;
```

## Azure Configuration

### 5. Environment Variables

Set these in Azure Portal > App Service > Configuration > Application settings:

### 5. Environment Variables

Set these in Azure Portal > App Service > Configuration > Application settings:

**Required Application Variables:**
- `NODE_ENV`: `production`
- `PROJECT_ID`: Your Google Cloud project ID
- `PRIVATE_KEY_ID`: Google service account private key ID
- `PRIVATE_KEY`: Google service account private key (full key with header and footer)
- `CLIENT_EMAIL`: Google service account email
- `SHEETS_ID`: Google Sheets document ID
- `CALENDAR_URL`: Google Calendar embed URL

**Azure-Managed Variables (DO NOT SET - Azure handles these automatically):**
- `PORT` - Azure sets to 8080 automatically
- `NODE_PATH` - Azure sets to `/usr/local/lib/node_modules`
- `WEBSITES_PORT` - Azure manages port binding

**Variables to Remove (from previous troubleshooting):**
- `SCM_DO_BUILD_DURING_DEPLOYMENT` - Not needed with current approach
- `WEBSITE_RUN_FROM_PACKAGE` - Not needed with current approach

## GitHub Secrets

### 8. Required Secrets

Add these to GitHub repository > Settings > Secrets and variables > Actions:

- `AZUREAPPSERVICE_PUBLISHPROFILE_YOUR_SECRET`: Download from Azure Portal > App Service > Get publish profile

**Note:** Environment variables like API keys should be configured in Azure Portal, not as GitHub secrets, since they need to be available at runtime.

## Deployment Steps

### 9. Setup Process

1. **Create Azure App Service** (Linux, Node.js runtime)
2. **Download publish profile** from Azure Portal
3. **Add publish profile as GitHub secret**
4. **Create all required files** (app.js, web.config, workflow)
5. **Update workflow** with your app service name and secret name
6. **Configure environment variables** in Azure Portal (see section 5 above)
7. **Push to main branch** to trigger deployment

## Key Success Factors

### 10. Critical Elements

1. **Custom app.js entry point** - Properly initializes Next.js
2. **Include node_modules in deployment** - Ensures all dependencies are available
3. **include-hidden-files: true** - Ensures .next directory is included in artifact
4. **NODE_ENV=production** - Tells Next.js to run in production mode
5. **Hostname 0.0.0.0** - Allows Azure to bind to the application
6. **Regular Next.js build** - Not standalone mode

## Troubleshooting

### 11. Common Issues

- **"Cannot find module 'next'"** - Ensure node_modules is included in deployment
- **"Could not find production build"** - Ensure .next directory is included with include-hidden-files: true
- **App not starting** - Check Azure logs for specific error messages
- **Environment variables not working** - Verify they're set in Azure Portal, not just .env files
- **Google API errors** - Ensure PRIVATE_KEY includes the full key with BEGIN/END markers
- **Sheets/Calendar not loading** - Verify PROJECT_ID, CLIENT_EMAIL, and SHEETS_ID are correct

## Current Working Environment Variables

Based on your successful deployment, these are the environment variables currently configured:

```
CALENDAR_URL=https://calendar.google.com/calendar/embed?...
CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
NODE_ENV=production
NODE_PATH=/usr/local/lib/node_modules
PORT=8080
PRIVATE_KEY=[your-private-key-content]
PRIVATE_KEY_ID=your-key-id
PROJECT_ID=your-project-id
SHEETS_ID=your-sheets-id
WEBSITES_PORT=8080
```

**Variables you can safely remove:**
- `SCM_DO_BUILD_DURING_DEPLOYMENT` - Legacy from troubleshooting
- `WEBSITE_RUN_FROM_PACKAGE` - Legacy from troubleshooting  
- `WEBSITES_PORT` - Azure manages this automatically
- `NODE_PATH` - Azure sets this automatically
- `PORT` - Azure typically sets this automatically (try removing, add back if needed)

## File Structure

```
your-project/
├── .github/
│   └── workflows/
│       └── azure-app-service.yml
├── src/
├── public/
├── app.js
├── web.config
├── next.config.ts
├── package.json
└── other Next.js files...
```

## Notes

- Environment files (.env.local) are excluded from version control for security
- Azure will use environment variables configured in the portal
- The deployment includes complete node_modules for reliability
- Debugging logs help troubleshoot deployment issues

This configuration has been tested and confirmed working for Next.js deployment to Azure App Service on Linux.