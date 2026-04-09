import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ForgotPasswordUseCase } from '@/use-case/user/forgot-password.js'

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}