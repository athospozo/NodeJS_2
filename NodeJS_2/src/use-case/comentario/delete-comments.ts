import type { Comentario } from '@/@types/prisma/index.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { commentDoesNotexist } from '../errors/comment-does-not-exist.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'
import { youDontHavePermission } from '../errors/you-dont-have-permission.js'

export class DeleteCommentUseCase {
  constructor(
    private commentRepository: CommentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(publicId: string, publicUserId: string): Promise<Comentario> {
    const comentario = await this.commentRepository.findBy({
      publicId: publicId,
    })

    if (!comentario) throw new commentDoesNotexist()

    const user = await this.usersRepository.findBy({ publicId: publicUserId })

    if (!user) throw new UserDoesntexist()

    if (comentario.usuarioId !== user.id) throw new youDontHavePermission()

    const comentarioDeletado = await this.commentRepository.delete(
      comentario.id,
    )

    return comentarioDeletado
  }
}
