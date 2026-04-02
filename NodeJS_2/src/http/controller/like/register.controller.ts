import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { LikePresenter } from '@/http/presenter/like-presenter.js'
import { makeRegisterLikesUseCase } from '@/use-case/factories/like/make-register-like-use-case.js'

export async function registerLike(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      idPost: z.uuid().optional(),
      idComentario: z.uuid().optional(),
    })

    const { idPost, idComentario } = registerBodySchema.parse(request.body)

    const idUser = request.user.sub

    const registerLikeUseCase = makeRegisterLikesUseCase()

    const { like } = await registerLikeUseCase.execute({
      idUser: idUser,
      idPost: idPost,
      idComentario: idComentario,
    })

    return reply.status(201).send({
      message: 'Like criado com sucesso',
      like: LikePresenter.toHTTP(like),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
