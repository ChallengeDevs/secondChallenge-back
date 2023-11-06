import 'dotenv/config'
import { z } from 'zod'

// esquema de variáveis de ambiente com validação pelo zod
const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

// valida e caso tenha erro retorna objeto contendo instancia de ZodError
const _env = envSchema.safeParse(process.env)

// caso validação falhe
if (!_env.success) {
  console.error('Invalid environment variables.', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
