import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { PatchUserUseCase } from '@/use-case/user/patch-users.js'

export function makePatchUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const patchUserUseCase = new PatchUserUseCase(usersRepository)

  return patchUserUseCase
}
