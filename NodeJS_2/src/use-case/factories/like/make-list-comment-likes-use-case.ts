import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { ReadCommentLikes } from '@/use-case/like/list-comment-likes.js'

export function makeReadCommentLikesUseCase() {
  const commentsRepository = new PrismaCommentsRepository()
  const readLikesUseCase = new ReadCommentLikes(commentsRepository)

  return readLikesUseCase
}
