import { randomBytes } from 'node:crypto'
import z from 'zod'
import type { Usuario } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserNotFoundForPasswordResetError } from '../errors/user-not-found-for-password-reset-error.js'

interface ForgotPasswordUseCaseRequest {
  login: string
}

type ForgotPasswordUseCaseResponse = {
  user: Usuario
  token: string
}

const EXPIRES_IN_MINUTES = 15
const TOKEN_LENGTH = 32

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    login,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    let userExists: Usuario | null = null

    if (z.string().email().safeParse(login).success) {
      userExists = await this.usersRepository.findBy({ email: login })
    }

    const passwordToken = randomBytes(TOKEN_LENGTH).toString('hex')

    const tokenExpiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000)

    const tokenData = {
      token: passwordToken,
      tokenExpiresAt,
    }

    if (!userExists) throw new UserNotFoundForPasswordResetError()

    const user = await this.usersRepository.update(userExists.publicId, {
      ...tokenData,
    })

    return {
      user,
      token: passwordToken,
    }
  }
}
