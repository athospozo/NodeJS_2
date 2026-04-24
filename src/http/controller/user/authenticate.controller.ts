import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenter/user-presenter.js'
import { invalidCredentialsError } from '@/use-case/errors/invalid-credentials-error.js'
import { makeAuthenticateUseCase } from '@/use-case/factories/user/make-authenticate.js'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authenticateBodySchema = z.object({
      email: z.email().max(100).optional(),
      password: z.string().trim().min(3).max(30),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    if (!email) {
      return reply
        .status(400)
        .send({ message: 'Email is required for authentication.' })
    }

    const authenticateUserUseCase = makeAuthenticateUseCase()
    const { user, token } = await authenticateUserUseCase.execute({
      login: email,
      password,
    })

    return reply.status(201).send({
      message: 'Usuário autenticado com sucesso',
      user: UserPresenter.toHTTP(user),
      token,
    })
  } catch (error) {
    if (error instanceof invalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
