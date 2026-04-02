import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { CommentPresenter } from '@/http/presenter/comment-presenter.js'
import { makePatchCommentsUseCase } from '@/use-case/factories/comments/make-patch-comments-use-case.js'

export async function patchComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerParamsSchema = z.object({
      id: z.coerce.string(),
    })

    const registerBodySchema = z.object({
      conteudo: z.string(),
    })

    const { id } = registerParamsSchema.parse(request.params)
    const { conteudo } = registerBodySchema.parse(request.body)

    const idUsuario = request.user.sub

    const patchCommentUseCase = makePatchCommentsUseCase()
    const comentario = await patchCommentUseCase.execute(
      id,
      conteudo,
      idUsuario,
    )

    return reply.status(200).send({
      message: 'Comentário atualizado com sucesso',
      comentario: CommentPresenter.toHTTP(comentario),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
