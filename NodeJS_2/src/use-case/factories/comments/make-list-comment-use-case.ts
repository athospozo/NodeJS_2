import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { ListCommentsUseCase } from '@/use-case/comentario/list-comments.js'

export function makeListCommentsUseCase() {
  const commentRepository = new PrismaCommentsRepository()
  const listCommentUseCase = new ListCommentsUseCase(commentRepository)

  return listCommentUseCase
}
