import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenter/user-presenter.js'
import { makePatchUserUseCase } from '@/use-case/factories/user/make-patch-user-use-case.js'

export async function patchbyId(request: FastifyRequest, reply: FastifyReply) {
  try {
    // recolhendo os dados a serem deletados:
    const PatchBodySchema = z.object({
      name: z.string().trim().min(1).max(100).optional(),
      email: z.string().max(100).optional(),
      password: z.string().trim().min(3).max(30).optional(),
      picture: z.string().min(2).max(100).optional(),
    })

    const idUsuario = request.user.sub

    const { name, email, password, picture } = PatchBodySchema.parse(
      request.body,
    )

    const patchUserUseCase = makePatchUserUseCase()
    const { user } = await patchUserUseCase.execute(idUsuario, {
      name,
      email,
      passwordHash: password,
      photo: picture,
    })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
