import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthenticateUserUseCase } from '@/use-case/user/authenticate.js'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUserUseCase
}
