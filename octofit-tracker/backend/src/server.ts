import { PORT, CODESPACE_NAME } from './config.js'
import { connectDatabase } from './config/database.js'
import app from './index.js'

const codespaceUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

async function startServer() {
  try {
    await connectDatabase()
    console.log('Connected to MongoDB')
    console.log('Server will use API URL:', codespaceUrl)

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

startServer()
