import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { CommentPresenter } from '@/http/presenter/comment-presenter.js'
import { makeRegisterCommentsUseCase } from '@/use-case/factories/comments/make-register-comment-use-case.js'

export async function registerComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
      conteudo: z.string(),
      idPost: z.uuid(),
    })

    const { conteudo, idPost } = registerBodySchema.parse(request.body)

    const idUsuario = request.user.sub

    const registerCommentUseCase = makeRegisterCommentsUseCase()
    const { comentario } = await registerCommentUseCase.execute({
      conteudo,
      idUsuario,
      idPost,
    })

    return reply.status(201).send({
      message: 'Comentário criado com sucesso',
      comentario: CommentPresenter.toHTTP(comentario),
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
