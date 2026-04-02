import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenter/user-presenter.js'
import { UserDoesntexist } from '@/use-case/errors/user-does-not-exist.js'
import { makeReadUserUseCase } from '@/use-case/factories/user/make-read-user-use-case.js'

export async function readbyId(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })

    const { id } = paramsSchema.parse(request.params)

    const readUserUseCase = makeReadUserUseCase()
    const { user } = await readUserUseCase.execute(id)

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof UserDoesntexist) {
      return reply.status(404).send({ error: error.message })
    }
    throw error
  }
}
