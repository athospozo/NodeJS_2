import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PostPresenter } from '@/http/presenter/post-presenter.js'
import { PostDoesntexist } from '@/use-case/errors/post-does-not-exist.js'
import { readByIdPostUseCase } from '@/use-case/factories/post/make-read-by-id-use-case.js'

export async function readbyId(request: FastifyRequest, reply: FastifyReply) {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number(),
    })

    const { id } = paramsSchema.parse(request.params)

    const readPostByIdUseCase = readByIdPostUseCase()
    const { post } = await readPostByIdUseCase.execute(id)

    return reply.status(200).send(PostPresenter.toHTTP(post))
  } catch (error) {
    if (error instanceof PostDoesntexist) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
