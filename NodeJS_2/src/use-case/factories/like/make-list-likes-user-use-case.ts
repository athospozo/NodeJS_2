import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ReadUserLikes } from '@/use-case/like/list-user-likes.js'

export function makeReadUserLikesUseCase() {
  const userRepository = new PrismaUsersRepository()
  const readLikesUseCase = new ReadUserLikes(userRepository)

  return readLikesUseCase
}
