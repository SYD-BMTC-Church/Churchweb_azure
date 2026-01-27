const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

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

console.log('Preparing Next.js application...')

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
  process.exit(1)
})