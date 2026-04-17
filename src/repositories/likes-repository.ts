import type { Like, Prisma } from '@/@types/prisma/client.js'

export interface LikesRepository {
  create(data: {
    idUser: number
    idPost?: number
    idComentario?: number
  }): Promise<Like>
  findBy(where: Prisma.LikeWhereUniqueInput): Promise<Like | null>
  delete(id: number): Promise<Like>
}
