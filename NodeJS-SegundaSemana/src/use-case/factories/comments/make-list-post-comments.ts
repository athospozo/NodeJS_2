import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { ReadPostComments } from '@/use-case/comentario/list-post-comments.js'

export function makeReadPostCommentsUseCase() {
  const postRepository = new PrismaPostsRepository()
  const listCommentUseCase = new ReadPostComments(postRepository)

  return listCommentUseCase
}
