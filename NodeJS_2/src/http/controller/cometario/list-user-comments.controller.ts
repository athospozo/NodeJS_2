import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { CommentPresenter } from '@/http/presenter/comment-presenter.js'
import { makeReadUserCommentsUseCase } from '@/use-case/factories/comments/make-list-user-comments.js'

export async function readUserComments(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerParamsSchema = z.object({
      id: z.coerce.string(),
    })

    // id publico do post
    const { id } = registerParamsSchema.parse(request.params)

    const readUserCommentsUseCase = makeReadUserCommentsUseCase()
    const comentarios = await readUserCommentsUseCase.execute(id)

    return reply.status(200).send({
      message: 'Comentários do usuário alcançados com sucesso',
      comentario: CommentPresenter.toHTTP(comentarios),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
