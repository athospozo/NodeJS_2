import type { Comentario } from '@/@types/prisma/index.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'

export class ListCommentsUseCase {
  constructor(private commentRepository: CommentsRepository) {}
  async execute(): Promise<Comentario[] | null> {
    const comentarios = await this.commentRepository.findAll()

    return comentarios
  }
}
