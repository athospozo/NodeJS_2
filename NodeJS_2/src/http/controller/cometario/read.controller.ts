import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { CommentPresenter } from '@/http/presenter/comment-presenter.js'
import { makeReadCommentsUseCase } from '@/use-case/factories/comments/make-read-comments-use-case.js'

export async function readComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      id: z.coerce.string(),
    })

    const { id } = registerBodySchema.parse(request.params)

    const readCommentUseCase = makeReadCommentsUseCase()
    const comentario = await readCommentUseCase.execute(id)

    return reply.status(200).send({
      message: 'Comentário alcançado com sucesso',
      comentario: CommentPresenter.toHTTP(comentario),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
