export const getScoreboard = {
  schema: {
    description: 'Route to get the NBA scoreboard from ESPN API.',
    summary: 'Get scoreboard.',
    tags: ['Score'],
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          data: {
            leagues: { type: 'array' },
            season: { type: 'object' },
            day: { type: 'object' },
            events: { type: 'array' },
          },
          status: { type: 'string' },
          statusMessage: { type: 'string' },
        },
      },
      500: {
        description: 'Fail response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
}

export const getTeams = {
  schema: {
    description: 'Route to get NBA teams.',
    summary: 'Get all teams.',
    tags: ['Score'],
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          data: {
            sports: { type: 'array' },
          },
        },
      },
      500: {
        description: 'Fail response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
}
