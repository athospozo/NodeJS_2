import type { FastifyReply, FastifyRequest } from 'fastify'
import { PostPresenter } from '@/http/presenter/post-presenter.js'
import { makeShowAllUseCase } from '@/use-case/factories/post/make-show-all-use-case.js'

export async function showAll(_request: FastifyRequest, reply: FastifyReply) {
  const showAllPostsUseCase = makeShowAllUseCase()
  const posts = await showAllPostsUseCase.execute()
  if (!posts) {
    return reply.status(200).send([])
  }
  return reply.status(200).send(PostPresenter.toHTTP(posts))
}
