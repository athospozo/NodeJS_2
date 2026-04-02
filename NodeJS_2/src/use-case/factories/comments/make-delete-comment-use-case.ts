import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteCommentUseCase } from '@/use-case/comentario/delete-comments.js'

export function makeDeleteCommentsUseCase() {
  const commentRepository = new PrismaCommentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deletedCommentUseCase = new DeleteCommentUseCase(
    commentRepository,
    usersRepository,
  )

  return deletedCommentUseCase
}
