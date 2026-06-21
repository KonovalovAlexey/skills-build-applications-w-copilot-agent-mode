import { Router } from 'express'
import Team from '../models/team.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members').lean()
    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch teams', details: error })
  }
})

router.post('/', async (req, res) => {
  try {
    const team = await Team.create(req.body)
    res.status(201).json(team)
  } catch (error) {
    res.status(500).json({ error: 'Unable to create team', details: error })
  }
})

export default router
