import type { Usuario } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

export class ShowAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(): Promise<Usuario[] | null> {
    const usuarios = await this.usersRepository.findAll()

    return usuarios
  }
}
