import { Schema, model } from 'mongoose'

export interface TeamDocument {
  name: string
  description: string
  members: string[]
  score: number
  createdAt: Date
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: { type: Number, required: true, default: 0 },
}, { timestamps: true })

export default model<TeamDocument>('Team', teamSchema)
