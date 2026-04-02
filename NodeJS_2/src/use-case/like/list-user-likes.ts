import type { Like } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

export class ReadUserLikes {
  constructor(private userRepository: UsersRepository) {}

  async execute(publicId: string): Promise<Like[] | null> {
    // verificamos se o usuario existe:
    const usuario = await this.userRepository.findBy({ publicId: publicId })

    if (!usuario) throw new UserDoesntexist()

    const likes = await this.userRepository.findLikes(usuario.id)

    return likes
  }
}
