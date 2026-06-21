import app from './index.js'
import { PORT, CODESPACE_NAME } from './config.js'

const codespaceUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

app.get('/__status', (_req, res) => {
  res.json({ status: 'ok', apiUrl: codespaceUrl })
})

app.listen(PORT, () => {
  console.log(`Dev server listening on http://localhost:${PORT}`)
  console.log('API URL:', codespaceUrl)
})
