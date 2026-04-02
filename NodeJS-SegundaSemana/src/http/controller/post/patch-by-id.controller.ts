import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PostPresenter } from '@/http/presenter/post-presenter.js'
import { PostDoesntexist } from '@/use-case/errors/post-does-not-exist.js'
import { makePatchPostUseCase } from '@/use-case/factories/post/make-patch-post-use-case.js'

export async function patchbyId(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.string(), // Transforma a string da URL em número
    })

    const PatchPostSchema = z.object({
      titulo: z.string().trim().min(1).max(100).optional(),
      Conteudo: z.string().trim().min(1).max(1000).optional(),
    })

    const { id } = paramsSchema.parse(request.params)

    const { titulo, Conteudo } = PatchPostSchema.parse(request.body)

    const publicUserId = request.user.sub

    const patchPostUseCase = makePatchPostUseCase()
    const { post } = await patchPostUseCase.execute(
      id,
      {
        titulo,
        Conteudo,
      },
      publicUserId,
    )

    return reply.status(200).send(PostPresenter.toHTTP(post))
  } catch (error) {
    if (error instanceof PostDoesntexist) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
