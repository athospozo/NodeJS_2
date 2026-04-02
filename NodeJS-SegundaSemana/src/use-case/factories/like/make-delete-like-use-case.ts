import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteLikeUseCase } from '@/use-case/like/delete-like.js'

export function makeDeleteLikesUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteLikesUseCase = new DeleteLikeUseCase(
    likesRepository,
    usersRepository,
  )

  return deleteLikesUseCase
}
