import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { PatchCommentUseCase } from '@/use-case/comentario/patch-comments.js'

export function makePatchCommentsUseCase() {
  const commentRepository = new PrismaCommentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const patchedCommentUseCase = new PatchCommentUseCase(
    commentRepository,
    usersRepository,
  )

  return patchedCommentUseCase
}
