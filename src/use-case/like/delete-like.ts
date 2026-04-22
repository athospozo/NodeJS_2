import type { Like } from '@/@types/prisma/client.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { likeDoesNotexist } from '../errors/like-does-not-exist.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'
import { youDontHavePermission } from '../errors/you-dont-have-permission.js'

// usuario que sera devolvido mostrando que foi apagado
type DeletedLikeUseCaseResponse = {
  like: Like
}

export class DeleteLikeUseCase {
  constructor(
    private likeRepository: LikesRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute(
    publicid: string,
    publicUserId: string,
  ): Promise<DeletedLikeUseCaseResponse> {
    // checamos se o like existe:
    const likeWithSameId = await this.likeRepository.findBy({
      publicId: publicid,
    })

    if (!likeWithSameId) {
      throw new likeDoesNotexist()
    }

    const user = await this.usersRepository.findBy({ publicId: publicUserId })

    if (!user) throw new UserDoesntexist()

    if (likeWithSameId.usuarioId !== user.id) throw new youDontHavePermission()

    const likeDeletado = await this.likeRepository.delete(likeWithSameId.id)

    return { like: likeDeletado }
  }
}
