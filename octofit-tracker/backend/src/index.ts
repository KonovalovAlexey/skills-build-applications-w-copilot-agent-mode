import express from 'express'
import { PORT, API_URL } from './config.js'
import { connectDatabase } from './config/database.js'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running',
    apiUrl: API_URL,
  })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

export default app
