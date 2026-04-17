import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ReadUserComments } from '@/use-case/comentario/list-user-comments.js'

export function makeReadUserCommentsUseCase() {
  const userRepository = new PrismaUsersRepository()
  const listCommentUseCase = new ReadUserComments(userRepository)

  return listCommentUseCase
}
