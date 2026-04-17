import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RegisterLikeUseCase } from '@/use-case/like/register-likes.js'

export function makeRegisterLikesUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const commentsRepository = new PrismaCommentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const postsRepository = new PrismaPostsRepository()

  const registerLikesUseCase = new RegisterLikeUseCase(
    likesRepository,
    commentsRepository,
    postsRepository,
    usersRepository,
  )

  return registerLikesUseCase
}
