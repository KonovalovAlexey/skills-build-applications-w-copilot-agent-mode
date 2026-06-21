import dotenv from 'dotenv'

dotenv.config()

export const PORT = Number(process.env.PORT || 8000)
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'
export const CODESPACE_NAME = process.env.CODESPACE_NAME
export const LOCAL_API_URL = `http://localhost:${PORT}`
export const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : LOCAL_API_URL
