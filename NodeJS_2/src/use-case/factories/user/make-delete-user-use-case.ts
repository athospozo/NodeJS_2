import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteUserUseCase } from '@/use-case/user/delete-users.js'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUserUseCase
}
