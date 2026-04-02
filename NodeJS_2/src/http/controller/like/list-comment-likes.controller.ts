import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LikePresenter } from '@/http/presenter/like-presenter.js'
import { makeReadCommentLikesUseCase } from '@/use-case/factories/like/make-list-comment-likes-use-case.js'

export async function ReadCommentLikes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerParamsSchema = z.object({
      id: z.coerce.string(),
    })

    const { id } = registerParamsSchema.parse(request.params)

    const readCommentLikesUseCase = makeReadCommentLikesUseCase()
    const likes = await readCommentLikesUseCase.execute(id)

    return reply.status(200).send({
      message: 'Likes do comentario acessados com sucesso',
      likes: LikePresenter.toHTTP(likes),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
