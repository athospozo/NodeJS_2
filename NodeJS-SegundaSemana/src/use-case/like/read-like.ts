import type { Like } from '@/@types/prisma/client.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import { likeDoesNotexist } from '../errors/like-does-not-exist.js'

export class ReadLikeUseCase {
  constructor(private likeRepository: LikesRepository) {}
  async execute(publicid: string): Promise<Like> {
    // checamos se o like existe:
    const likeWithSameId = await this.likeRepository.findBy({
      publicId: publicid,
    })

    if (!likeWithSameId) {
      throw new likeDoesNotexist()
    }

    return likeWithSameId
  }
}
