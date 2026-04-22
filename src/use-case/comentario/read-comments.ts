import type { Comentario } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import { commentDoesNotexist } from '../errors/comment-does-not-exist.js'

export class ReadCommentsUseCase {
  constructor(private commentRepository: CommentsRepository) {}

  async execute(id: string): Promise<Comentario> {
    const comentario = await this.commentRepository.findBy({ publicId: id })

    if (!comentario) throw new commentDoesNotexist()

    return comentario
  }
}
