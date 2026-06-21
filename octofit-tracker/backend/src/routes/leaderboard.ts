import { Router } from 'express'
import Leaderboard from '../models/leaderboard.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const entries = await Leaderboard.find().lean()
    res.json(entries)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard entries', details: error })
  }
})

router.post('/', async (req, res) => {
  try {
    const entry = await Leaderboard.create(req.body)
    res.status(201).json(entry)
  } catch (error) {
    res.status(500).json({ error: 'Unable to create leaderboard entry', details: error })
  }
})

export default router
