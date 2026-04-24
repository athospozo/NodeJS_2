import { compare } from 'bcryptjs'
import type { Usuario } from '@/@types/prisma/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { invalidCredentialsError } from '../errors/invalid-credentials-error.js'

export interface HashProvider {
  compare(plainText: string, hash: string): Promise<boolean>
}

export interface JwtProvider {
  generate(userId: string): Promise<string> | string
}
interface AuthenticateUserUseCaseRequest {
  login: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  user: Usuario
  token: string
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
    private jwtProvider: JwtProvider,
  ) {}

  async execute({
    login,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(login)

    if (!user) {
      throw new invalidCredentialsError()
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.passwordHash,
    )

    if (!passwordMatch) {
      throw new invalidCredentialsError()
    }

    const token = await this.jwtProvider.generate({
      sub: user.publicId,
      role: user.role,
    })

    return { user, token }
  }
}
