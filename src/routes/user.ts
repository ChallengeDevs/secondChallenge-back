import { User } from '@/models/user'
import { z } from 'zod'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { connectDatabase } from '@/middlewares/database'
import bcrypt from 'bcrypt'
export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: connectDatabase },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const responseDB = await User.find()
      reply.status(200).send({
        status: 'OK',
        statusMessage: 'Users retrieved',
        users: responseDB,
      })
    },
  )

  app.post(
    '/',
    { preHandler: connectDatabase },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const createUserSchema = z.object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
      })

      const { name, email, password, username } = createUserSchema.parse(
        request.body,
      )

      const hashedPassword = await bcrypt.hash(password, 10)

      const responseDB = await User.create({
        name,
        email,
        password: hashedPassword,
        username,
      })
      return reply.status(201).send({
        status: 'OK',
        statusMessage: 'User created successfully!',
        user: responseDB,
      })
    },
  )

  app.post(
    '/login',
    { preHandler: connectDatabase },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const loginUserSchema = z.object({
          username: z.string(),
          password: z.string(),
        })

        const { username, password } = loginUserSchema.parse(request.body)

        const userExists = await User.findOne({ username })

        if (userExists) {
          const hashedPassword = await bcrypt.hash(password, 10)
          await bcrypt.compare(userExists.password, hashedPassword)
        } else {
          throw new Error("User doesn't exist in database!")
        }
      } catch (error) {
        console.error('Error on user login, please verify.', error)
        return reply.status(500).send('Error on user login.')
      }
    },
  )
}
