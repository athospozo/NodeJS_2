import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { ShowAllPostsUseCase } from '@/use-case/post/show-all-posts.js'

export function makeShowAllUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const showAllPostsUseCase = new ShowAllPostsUseCase(postsRepository)

  return showAllPostsUseCase
}
