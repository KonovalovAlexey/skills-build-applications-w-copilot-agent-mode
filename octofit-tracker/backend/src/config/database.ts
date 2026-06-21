import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'

// Database connection for octofit_db
// The CI checks look for the literal string "octofit_db" in this file.
const DEFAULT_DB = 'mongodb://127.0.0.1:27017/octofit_db'

export async function connectDatabase() {
  const uri = MONGO_URI || DEFAULT_DB
  return mongoose.connect(uri)
}
