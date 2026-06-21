import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().lean()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users', details: error })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Unable to create user', details: error })
  }
})

export default router
