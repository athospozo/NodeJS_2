import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RegisterPostUseCase } from '@/use-case/post/register-post.js'

export function makePostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const registerPostUseCase = new RegisterPostUseCase(
    postsRepository,
    usersRepository,
  )

  return registerPostUseCase
}
