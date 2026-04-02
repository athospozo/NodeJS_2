import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LikePresenter } from '@/http/presenter/like-presenter.js'
import { makereadLikesUseCase } from '@/use-case/factories/like/make-read-like-use-case.js'

export async function readLike(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      id: z.coerce.string(),
    })

    const { id } = registerBodySchema.parse(request.params)

    const readLikeUseCase = makereadLikesUseCase()
    const like = await readLikeUseCase.execute(id)

    return reply.status(200).send({
      message: 'Like acessado com sucesso',
      like: LikePresenter.toHTTP(like),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
