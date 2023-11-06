import { env } from '@/env'
import { User } from '@/models/user'
import {
  createUser,
  getUsers,
  loginUser,
} from '@/utils/routes-schemas/userRoutesSchema'
import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/',
    getUsers,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const responseDB = await User.find()
        reply.status(200).send({
          status: 'OK',
          statusMessage: 'Users retrieved',
          users: responseDB,
        })
      } catch (error) {
        console.error('Error on user retrieving, please verify.', error)
        return reply.status(500).send({ error: 'Error on retrieving users.' })
      }
    },
  )

  app.post(
    '/',
    createUser,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const createUserSchema = z.object({
          name: z.string(),
          username: z.string(),
          email: z.string(),
          password: z.string(),
        })

        const { name, email, password, username } = createUserSchema.parse(
          request.body,
        )

        const userExists = await User.findOne({ email })

        if (userExists) {
          return reply.status(409).send('User already exists.')
        } else {
          const hashedPassword = await bcrypt.hash(password, 10)

          await User.create({
            name,
            email,
            password: hashedPassword,
            username,
          })
          return reply.status(201).send({
            status: 'OK',
            statusMessage: 'User created successfully!',
          })
        }
      } catch (error) {
        console.error('Error on user creation, please verify.', error)
        return reply.status(500).send({ error: 'Error on creating user.' })
      }
    },
  )

  app.post(
    '/login',
    loginUser,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const loginUserSchema = z.object({
          email: z.string(),
          password: z.string(),
        })

        const { email, password } = loginUserSchema.parse(request.body)

        const userExists = await User.findOne({ email })
        if (userExists) {
          const passwordMatch = await bcrypt.compare(
            password,
            userExists.password,
          )

          if (passwordMatch) {
            const token = jwt.sign(
              {
                id: userExists._id,
              },
              env.JWT_SECRET,
              { expiresIn: '1d' },
            )

            return reply.status(200).send({
              token,
              status: 'OK',
              statusMessage: 'User logged in!',
            })
          } else {
            console.error('Email or password invalid! Please try again.')
            return reply.status(400).send({
              statusMessage: 'Email or password invalid! Please try again.',
            })
          }
        } else {
          console.error('Email or password invalid! Please try again.')
          return reply.status(400).send({
            statusMessage: 'Email or password invalid! Please try again.',
          })
        }
      } catch (error) {
        console.error('Error on user login, please verify.', error)
        return reply.status(500).send({ error: 'Error on user login.' })
      }
    },
  )
}
