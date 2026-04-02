import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { ReadPostById } from '@/use-case/post/read-post.js'

export function readByIdPostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const readByIdPostUseCase = new ReadPostById(postsRepository)

  return readByIdPostUseCase
}
