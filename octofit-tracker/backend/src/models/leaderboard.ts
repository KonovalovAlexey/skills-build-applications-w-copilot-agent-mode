import { Schema, model } from 'mongoose'

export interface LeaderboardDocument {
  type: 'user' | 'team'
  entityId: string
  rank: number
  score: number
  updatedAt: Date
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  type: { type: String, required: true, enum: ['user', 'team'] },
  entityId: { type: Schema.Types.ObjectId, required: true, refPath: 'typeRef' },
  rank: { type: Number, required: true },
  score: { type: Number, required: true },
}, {
  timestamps: { createdAt: false, updatedAt: true },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

leaderboardSchema.virtual('typeRef').get(function () {
  return this.type === 'team' ? 'Team' : 'User'
})

export default model<LeaderboardDocument>('Leaderboard', leaderboardSchema)
