import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  LOG_LEVEL: z
    .enum(['info', 'debug', 'warn', 'error', 'trace'])
    .default('info'),

  PORT: z.coerce.number().int().min(1024).max(65535).default(3333),
  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z.string(),

  HASH_SALT_ROUNDS: z.coerce.number().default(10),
  JWT_SECRET: z.string(),

  // Redis
  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string(),

  // SMTP
  SMTP_EMAIL: z.email(),
  SMTP_PASSWORD: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_HOST: z.string().min(1),
  SMTP_SECURE: z.enum(['true', 'false']).transform((val) => val === 'true'),

  CRON_SCHEDULE: z.string().default('0 10 * * *'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error)
  throw new Error('Invalid environment variables')
}

export const env = _env.data
