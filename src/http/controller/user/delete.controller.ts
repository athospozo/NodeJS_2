import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenter/user-presenter.js'
import { UserDoesntexist } from '@/use-case/errors/user-does-not-exist.js'
import { makeDeleteUserUseCase } from '@/use-case/factories/user/make-delete-user-use-case.js'

export async function deleteUserbyEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const idUsuario = request.user.sub

    const deleteUserUseCase = makeDeleteUserUseCase()
    const { user } = await deleteUserUseCase.execute(idUsuario)

    return reply.status(201).send({
      message: 'Usuário deletado com sucesso!',
      usuarioDeletado: UserPresenter.toHTTP(user),
    })
  } catch (error) {
    if (error instanceof UserDoesntexist) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
