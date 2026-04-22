import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LikePresenter } from '@/http/presenter/like-presenter.js'
import { makeReadPostLikesUseCase } from '@/use-case/factories/like/make-list-post-likes-use-case.js'

export async function ReadPostLikes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      id: z.coerce.string(),
    })

    const { id } = registerBodySchema.parse(request.params)

    const readPostLikes = makeReadPostLikesUseCase()
    const likes = await readPostLikes.execute(id)

    if (!likes) {
      return reply.status(404).send({ message: 'Like nao encontrado' })
    }

    return reply.status(200).send({
      message: 'Likes do post acessados com sucesso',
      likes: LikePresenter.toHTTP(likes),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(40).send({ message: error.message })
    }

    throw error
  }
}
