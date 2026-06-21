import { Schema, model } from 'mongoose'

export interface ActivityDocument {
  userId: string
  teamId: string
  type: string
  durationMinutes: number
  distanceKm?: number
  caloriesBurned: number
  date: Date
  notes?: string
}

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
}, { timestamps: true })

export default model<ActivityDocument>('Activity', activitySchema)
