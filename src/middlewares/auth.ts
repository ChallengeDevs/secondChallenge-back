import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../env'

export const auth = (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization

  if (!token) {
    return reply.status(400).send('Token not informed.')
  }

  try {
    jwt.verify(token, env.JWT_SECRET)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Something wrong happened.' })
  }
}
