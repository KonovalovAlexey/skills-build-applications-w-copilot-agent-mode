import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'

export async function connectDatabase() {
  return mongoose.connect(MONGO_URI)
}
