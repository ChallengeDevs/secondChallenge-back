import { app } from './app'
import { env } from './env'
import cors from '@fastify/cors'

app.register(cors, { origin: '*' })

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server running!')
})
