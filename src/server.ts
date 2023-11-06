import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { app } from './app'
import { env } from './env'
import { scoreRoutes } from './routes/score'
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
      { name: 'Score', description: 'Score Routes' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'User',
            },
            required: {
              type: 'array',
              example: ['name', 'email', 'password'],
              items: {
                type: 'string',
              },
            },
            properties: {
              type: 'object',
              properties: {
                id: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                name: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'John Doe',
                    },
                  },
                },
                username: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'johndoe',
                    },
                  },
                },
                email: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'johndoe@outlook.com',
                    },
                  },
                },
                password: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: '123456',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
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

app.register(scoreRoutes, {
  prefix: '/nba',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server running!')
})
