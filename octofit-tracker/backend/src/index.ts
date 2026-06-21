import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit'

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running' })
})

app.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`)

  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB at', mongoUri)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
  }
})
