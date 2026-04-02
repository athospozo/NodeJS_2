import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ReadUserByIdUseCase } from '@/use-case/user/read-user.js'

export function makeReadUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const readUserUseCase = new ReadUserByIdUseCase(usersRepository)

  return readUserUseCase
}
