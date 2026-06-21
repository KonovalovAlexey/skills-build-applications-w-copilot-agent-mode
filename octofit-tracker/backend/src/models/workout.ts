import { Schema, model } from 'mongoose'

export interface WorkoutDocument {
  name: string
  description: string
  focus: string
  durationMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  recommendedFor: string[]
  createdAt: Date
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  recommendedFor: [{ type: String }],
}, { timestamps: true })

export default model<WorkoutDocument>('Workout', workoutSchema)
