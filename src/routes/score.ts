import { auth } from '@/middlewares/auth'
import {
  getScoreboard,
  getTeams,
} from '@/utils/routes-schemas/scoreRoutesSchema'
import { FastifyInstance } from 'fastify'

const baseURL = (path: string) =>
  `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/${path}`

interface ScoreboardSchema {
  leagues: Array<object>
  season: object
  day: object
  events: Array<object>
}

interface TeamsSchema {
  sports: Array<object>
}

export async function scoreRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    auth(request, reply)
  })

  app.get('/scoreboard', getScoreboard, async (request, reply) => {
    try {
      const scoreBoardFetch: ScoreboardSchema = await fetch(
        baseURL('scoreboard'),
      )
        .then((response) => response.json())
        .then((data) => {
          return data
        })

      return reply.status(200).send({
        data: scoreBoardFetch,
        status: 'OK',
        statusMessage: 'Data retrieved successfully.',
      })
    } catch (error) {
      console.error('Error retrieving scoreboard data.', error)
      return reply
        .status(500)
        .send({ error: 'Error retrieving scoreboard data.' })
    }
  })

  app.get('/teams', getTeams, async (request, reply) => {
    try {
      const teamsFetch: TeamsSchema = await fetch(baseURL('teams'))
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((data) => {
          return data
        })

      return reply.status(200).send({
        data: teamsFetch,
        status: 'OK',
        statusMessage: 'Data retrieved successfully.',
      })
    } catch (error) {
      console.error('Error retrieving scoreboard data.', error)
      return reply
        .status(500)
        .send({ error: 'Error retrieving scoreboard data.' })
    }
  })
}
