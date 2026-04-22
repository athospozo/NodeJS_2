import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { ReadLikeUseCase } from '@/use-case/like/read-like.js'

export function makereadLikesUseCase() {
  const likesRepository = new PrismaLikesRepository()
  const readLikesUseCase = new ReadLikeUseCase(likesRepository)

  return readLikesUseCase
}
