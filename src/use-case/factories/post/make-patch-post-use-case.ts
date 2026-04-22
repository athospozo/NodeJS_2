import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { PatchPostUseCase } from '@/use-case/post/patch-post.js'

export function makePatchPostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const patchPostUseCase = new PatchPostUseCase(
    postsRepository,
    usersRepository,
  )

  return patchPostUseCase
}
