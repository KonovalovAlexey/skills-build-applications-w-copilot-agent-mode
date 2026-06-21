import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/user.js'
import Team from '../models/team.js'
import Activity from '../models/activity.js'
import Leaderboard from '../models/leaderboard.js'
import Workout from '../models/workout.js'

dotenv.config()

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB for seeding:', mongoUri)

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.create([
    { name: 'Ava Morgan', email: 'ava.morgan@example.com', role: 'member' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'coach' },
    { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'member' },
  ])

  const teams = await Team.create([
    {
      name: 'Team Velocity',
      description: 'A high-energy squad focused on speed and endurance.',
      members: [users[0]._id, users[1]._id],
      score: 420,
    },
    {
      name: 'Team Zenith',
      description: 'A balanced group with a focus on strength and recovery.',
      members: [users[2]._id],
      score: 385,
    },
  ])

  const activities = await Activity.create([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      type: 'Running',
      durationMinutes: 45,
      distanceKm: 10,
      caloriesBurned: 520,
      date: new Date('2026-06-15T07:30:00Z'),
      notes: 'Morning tempo run.',
    },
    {
      userId: users[1]._id,
      teamId: teams[0]._id,
      type: 'Cycling',
      durationMinutes: 60,
      distanceKm: 22,
      caloriesBurned: 630,
      date: new Date('2026-06-16T08:00:00Z'),
      notes: 'Hill repeat session.',
    },
    {
      userId: users[2]._id,
      teamId: teams[1]._id,
      type: 'Yoga',
      durationMinutes: 50,
      caloriesBurned: 200,
      date: new Date('2026-06-16T10:00:00Z'),
      notes: 'Recovery flow.',
    },
  ])

  const leaderboardEntries = await Leaderboard.create([
    {
      type: 'team',
      entityId: teams[0]._id,
      rank: 1,
      score: 420,
    },
    {
      type: 'team',
      entityId: teams[1]._id,
      rank: 2,
      score: 385,
    },
    {
      type: 'user',
      entityId: users[0]._id,
      rank: 1,
      score: 210,
    },
  ])

  const workouts = await Workout.create([
    {
      name: 'Morning Energy Boost',
      description: 'A dynamic routine focused on mobility and light cardio.',
      focus: 'energy',
      durationMinutes: 30,
      difficulty: 'beginner',
      recommendedFor: ['beginners', 'recovery'],
    },
    {
      name: 'Strength Builder Circuit',
      description: 'Compound movements for full-body strength gains.',
      focus: 'strength',
      durationMinutes: 45,
      difficulty: 'intermediate',
      recommendedFor: ['members', 'endurance'],
    },
    {
      name: 'Advanced Speed Ladder',
      description: 'High-intensity interval plan designed for experienced athletes.',
      focus: 'speed',
      durationMinutes: 40,
      difficulty: 'advanced',
      recommendedFor: ['advanced', 'performance'],
    },
  ])

  console.log('Seed completed successfully:')
  console.log({
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboardEntries.length,
    workouts: workouts.length,
  })

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB after seeding')
}

seed().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})
