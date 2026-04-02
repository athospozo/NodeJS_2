import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenter/user-presenter.js'
import { makeShowAllUsersUseCase } from '@/use-case/factories/user/make-show-all-use-case.js'

export async function showAll(_request: FastifyRequest, reply: FastifyReply) {
  const showAllUsersUseCase = makeShowAllUsersUseCase()
  const usuarios = await showAllUsersUseCase.execute()
  if (!usuarios) {
    return reply.status(200).send([])
  }
  return reply.status(200).send(UserPresenter.toHTTP(usuarios))
}
