import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/lib/prisma.js'
import type { LikesRepository } from '../likes-repository.js'

export class PrismaLikesRepository implements LikesRepository {
  async create(data: {
    idUser: number
    idPost?: number
    idComentario?: number
  }) {
    return await prisma.like.create({
      data: {
        usuarioId: data.idUser,
        postId: data.idPost ?? null,
        comentarioId: data.idComentario ?? null,
      },
    })
  }

  async findBy(where: Prisma.LikeWhereUniqueInput) {
    return await prisma.like.findUnique({ where })
  }

  async delete(id: number) {
    return await prisma.like.delete({
      where: { id },
    })
  }
}
