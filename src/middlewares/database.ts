import mongoose from 'mongoose'
import { env } from '@/env'

let dbConnect: any = null

export const connectDatabase = async () => {
  try {
    if (!dbConnect) {
      dbConnect = await mongoose.connect(env.DATABASE_URL)
      console.log('Connected to database!')
    }
    return dbConnect
  } catch (error) {
    console.log('Error connecting to database')
    return error
  }
}
