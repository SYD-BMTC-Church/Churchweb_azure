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