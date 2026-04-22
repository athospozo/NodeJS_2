import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PostPresenter } from '@/http/presenter/post-presenter.js'
import { makePostUseCase } from '@/use-case/factories/post/make-register-use-case.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      titulo: z.string().trim().min(1).max(100),
      Conteudo: z.string().trim().min(1).max(1000),
    })

    const { titulo, Conteudo } = registerBodySchema.parse(request.body)

    const idUsuario = request.user.sub

    const createPostUseCase = makePostUseCase()
    const { post } = await createPostUseCase.execute({
      titulo,
      Conteudo,
      Idautor: idUsuario,
    })

    return reply.status(201).send(PostPresenter.toHTTP(post))
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send(error)
    }

    throw error
  }
}
