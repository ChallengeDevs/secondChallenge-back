import { Schema, model } from 'mongoose'

interface UserInterface {
  name: string
  password: string
  email: string
  username: string
}

const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
})

export const User = model<UserInterface>('User', userSchema)
