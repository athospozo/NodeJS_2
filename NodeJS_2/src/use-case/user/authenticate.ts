import { compare } from 'bcryptjs'
import type { Usuario } from '@/@types/prisma/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { invalidCredentialsError } from '../errors/invalid-credentials-error.js'

interface AuthenticateUserUseCaseRequest {
  login: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  user: Usuario
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    login,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(login)

    if (!user) {
      throw new invalidCredentialsError()
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      throw new invalidCredentialsError()
    }

    return { user }
  }
}
