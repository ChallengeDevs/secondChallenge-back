import { FastifyInstance } from 'fastify'

const baseURL = (path: string) =>
  `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/${path}`

export async function scoreRoutes(app: FastifyInstance) {
  app.get('/scoreboard', async (request, reply) => {
    try {
      const scoreBoardFetch = await fetch(baseURL('scoreboard'))
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

  app.get('/teams', async (request, reply) => {
    try {
      const teamsFetch = await fetch(baseURL('teams'))
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
