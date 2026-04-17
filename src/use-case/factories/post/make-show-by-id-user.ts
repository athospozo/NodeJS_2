import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { ShowPostsUserUseCase } from '@/use-case/post/show-posts-by-id-user.js'

export function makeShowByIdUserUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const showPostByIdUserUseCase = new ShowPostsUserUseCase(postsRepository)

  return showPostByIdUserUseCase
}
