import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { ReadPostLikes } from '@/use-case/like/list-post-likes.js'

export function makeReadPostLikesUseCase() {
  const postRepository = new PrismaPostsRepository()
  const readLikesUseCase = new ReadPostLikes(postRepository)

  return readLikesUseCase
}
