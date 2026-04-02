import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { CommentsRepository } from '../comments-repository.js'

export class PrismaCommentsRepository implements CommentsRepository {
  async create(dados: { conteudo: string; idUser: number; idPost: number }) {
    return await prisma.comentario.create({
      data: {
        conteudo: dados.conteudo,
        usuarioId: dados.idUser,
        postId: dados.idPost,
      },
    })
  }

  async findAll() {
    return await prisma.comentario.findMany()
  }

  async findBy(where: Prisma.ComentarioWhereUniqueInput) {
    return await prisma.comentario.findUnique({ where })
  }

  async delete(id: number) {
    return await prisma.comentario.delete({
      where: { id },
    })
  }

  async update(id: number, conteudo: string) {
    return await prisma.comentario.update({
      where: {
        id,
      },
      data: {
        conteudo,
      },
    })
  }

  async findLikes(id: number) {
    const comentario = await prisma.comentario.findUnique({
      where: { id },
      include: { likes: true },
    })

    return comentario ? comentario.likes : null
  }
}
