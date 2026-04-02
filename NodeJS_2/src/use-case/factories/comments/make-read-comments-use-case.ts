import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { ReadCommentsUseCase } from '@/use-case/comentario/read-comments.js'

export function makeReadCommentsUseCase() {
  const commentRepository = new PrismaCommentsRepository()
  const readCommentUseCase = new ReadCommentsUseCase(commentRepository)

  return readCommentUseCase
}
