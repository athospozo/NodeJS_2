import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LikePresenter } from '@/http/presenter/like-presenter.js'
import { makeReadUserLikesUseCase } from '@/use-case/factories/like/make-list-likes-user-use-case.js'

export async function ReadUserLikes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      id: z.coerce.string(),
    })

    const { id } = registerBodySchema.parse(request.params)

    const readUserLikesUseCase = makeReadUserLikesUseCase()
    const likes = await readUserLikesUseCase.execute(id)

    if (!likes) {
      return reply.status(404).send({ message: 'Like nao encontrado' })
    }

    return reply.status(200).send({
      message: 'Likes do usuário acessados com sucesso',
      likes: LikePresenter.toHTTP(likes),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
