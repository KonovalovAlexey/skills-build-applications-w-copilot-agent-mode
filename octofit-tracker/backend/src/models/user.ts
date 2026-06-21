import { Schema, model } from 'mongoose'

export interface UserDocument {
  name: string
  email: string
  role: 'member' | 'coach' | 'admin'
  teamId?: string
  createdAt: Date
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true })

export default model<UserDocument>('User', userSchema)
