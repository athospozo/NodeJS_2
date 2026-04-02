import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LikePresenter } from '@/http/presenter/like-presenter.js'
import { makeDeleteLikesUseCase } from '@/use-case/factories/like/make-delete-like-use-case.js'

export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      id: z.uuid(),
    })

    const { id } = registerBodySchema.parse(request.body)

    const publicUserId = request.user.sub

    const deleteLikeUseCase = makeDeleteLikesUseCase()
    const { like } = await deleteLikeUseCase.execute(id, publicUserId)

    return reply.status(200).send({
      message: 'Like deletado com sucesso',
      like: LikePresenter.toHTTP(like),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
