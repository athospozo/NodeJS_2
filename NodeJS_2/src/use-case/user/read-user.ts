import type { Usuario } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

type GetUserUseCaseResponse = {
  user: Usuario
}

export class ReadUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(id: number): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) throw new UserDoesntexist()

    return { user }
  }
}
