import { connectDatabase } from '@/middlewares/database'

// GET USERS ROUTE
export const getUsers = {
  schema: {
    description: 'Route to get all users in database.',
    summary: 'Get all users.',
    tags: ['User'],
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
              },
            },
          },
        },
      },
      500: {
        description: 'Fail response',
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
        },
      },
    },
  },
  preHandler: [connectDatabase],
}

// CREATE USER ROUTE
export const createUser = {
  schema: {
    summary: 'Create user.',
    description:
      'Route to create user, information required in the body are name, e-mail & password. There is a verification for the duplicity of e-mails.',
    tags: ['User'],
    body: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      username: { type: 'string' },
    },
    response: {
      201: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          status: { type: 'string' },
          statusMessage: { type: 'string' },
        },
      },
      409: {
        description: 'Duplicate user',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  preHandler: [connectDatabase],
}

// UPDATE USER ROUTE
export const updateUser = {
  schema: {
    summary: 'Update user.',
    description:
      'Route to update user data, information sent through the body. Name, e-mail & password are possible to update.',
    tags: ['User'],
    body: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
    response: {
      204: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          status: { type: 'string' },
          statusMessage: { type: 'string' },
        },
      },
      400: {
        description: 'Fail response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  preHandler: [connectDatabase],
}

// DELETE USER ROUTE
export const deleteUser = {
  schema: {
    description:
      'Route to delete user, required to send User ID through params.',
    tags: ['User'],
    summary: 'Delete user.',
    response: {
      204: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          msg: { type: 'string' },
        },
      },
      400: {
        description: 'Fail response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  preHandler: [connectDatabase],
}

// LOGIN USER ROUTE
export const loginUser = {
  schema: {
    tags: ['User'],
    summary: 'User login with email & pwd.',
    description:
      'Route to login user with email and password information sent through the body.',
    body: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    response: {
      200: {
        description: 'Succesful login',
        type: 'object',
        properties: {
          token: { type: 'string' },
          status: { type: 'string' },
          statusMessage: { type: 'string' },
        },
      },
      400: {
        description: 'Fail login - user doesnt exist',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  preHandler: [connectDatabase],
}
