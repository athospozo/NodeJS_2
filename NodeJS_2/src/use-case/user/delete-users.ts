import type { Usuario } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

// usuario que sera devolvido mostrando que foi apagado
type DeletedUserUseCaseResponse = {
  user: Usuario
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(publicId: string): Promise<DeletedUserUseCaseResponse> {
    // checamos se o usuario existe:
    const userexists = await this.usersRepository.findBy({ publicId: publicId })

    if (!userexists) {
      throw new UserDoesntexist()
    }

    const user = await this.usersRepository.delete(publicId)

    return { user: user }
  }
}
