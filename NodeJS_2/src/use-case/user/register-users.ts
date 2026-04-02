import { hash } from 'bcryptjs'
import type { Usuario } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  picture?: string
}

type RegisterUserUseCaseResponse = {
  user: Usuario
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
    picture,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      photo: picture ?? '',
    })

    return { user }
  }
}
