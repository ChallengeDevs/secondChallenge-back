import { app } from './app'
import { env } from './env'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { userRoutes } from './routes/user'

app.register(cors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API ScoreSlam',
      description: 'API Documentation for Programming Challenge',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'The production API server',
      },
    ],
    tags: [
      { name: 'User', description: 'User Routes' },
      { name: 'Meal', description: 'Meal Routes' },
    ],
    components: {},
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject
  },
  transformSpecificationClone: true,
})

app.register(userRoutes, {
  prefix: '/user',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server running!')
})
