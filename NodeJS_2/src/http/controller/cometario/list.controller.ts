import type { FastifyReply, FastifyRequest } from 'fastify'
import { CommentPresenter } from '@/http/presenter/comment-presenter.js'
import { makeListCommentsUseCase } from '@/use-case/factories/comments/make-list-comment-use-case.js'

export async function listComments(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listCommentsUseCase = makeListCommentsUseCase()
    const comentarios = await listCommentsUseCase.execute()
    if (!comentarios) {
      return reply.status(200).send([])
    }
    return reply.status(200).send(CommentPresenter.toHTTP(comentarios))
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Não foi possível listar os comentários no momento.',
    })
  }
}
