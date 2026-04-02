import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { CommentPresenter } from '@/http/presenter/comment-presenter.js'
import { makeDeleteCommentsUseCase } from '@/use-case/factories/comments/make-delete-comment-use-case.js'

export async function deleteComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const deleteParamsSchema = z.object({
      id: z.coerce.string(),
    })

    const { id } = deleteParamsSchema.parse(request.params)

    const idUsuario = request.user.sub

    const deleteCommentUseCase = makeDeleteCommentsUseCase()
    const deletedComment = await deleteCommentUseCase.execute(id, idUsuario)

    return reply.status(200).send(CommentPresenter.toHTTP(deletedComment))
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
