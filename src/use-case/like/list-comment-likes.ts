import type { Like } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

export class ReadCommentLikes {
  constructor(private commentRepository: CommentsRepository) {}

  async execute(publicId: string): Promise<Like[] | null> {
    // verificamos se o usuario existe:
    const usuario = await this.commentRepository.findBy({ publicId: publicId })

    if (!usuario) throw new UserDoesntexist()

    const likes = await this.commentRepository.findLikes(usuario.id)

    return likes
  }
}
