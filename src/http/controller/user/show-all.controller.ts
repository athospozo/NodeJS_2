import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenter/user-presenter.js'
import { redis } from '@/lib/redis.js'
import { makeShowAllUsersUseCase } from '@/use-case/factories/user/make-show-all-use-case.js'

export async function showAll(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const cacheKey = 'users:all'

    const cachedUsers = await redis.get(cacheKey)

    if (cachedUsers) {
      return reply.status(200).send({ usuários: JSON.parse(cachedUsers) })
    }

    const showAllUsersUseCase = makeShowAllUsersUseCase()
    const usuarios = await showAllUsersUseCase.execute()

    if (!usuarios) {
      return reply.status(200).send([])
    }

    const usuariosFormatados = UserPresenter.toHTTP(usuarios)

    await redis.set(cacheKey, JSON.stringify(usuariosFormatados), 'EX', 60)

    return reply.status(200).send({ usuarios: usuariosFormatados })
  } catch (_error) {
    return reply.status(400).send({ message: 'Erro ao buscar usuários' })
  }
}
