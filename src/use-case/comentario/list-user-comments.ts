import type { Comentario } from '@/@types/prisma/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

export class ReadUserComments {
  constructor(private userRepository: UsersRepository) {}

  async execute(publicId: string): Promise<Comentario[] | null> {
    // verificamos se o usuario existe:
    const usuario = await this.userRepository.findBy({ publicId: publicId })

    if (!usuario) throw new UserDoesntexist()

    const comments = await this.userRepository.findComments(usuario.id)

    return comments
  }
}
