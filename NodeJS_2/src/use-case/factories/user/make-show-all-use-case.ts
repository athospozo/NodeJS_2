import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ShowAllUsersUseCase } from '@/use-case/user/show-all-users.js'

export function makeShowAllUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const showAllUsersUseCase = new ShowAllUsersUseCase(usersRepository)

  return showAllUsersUseCase
}
