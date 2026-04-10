import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/lib/prisma.js'
import type { PostsRepository } from '../posts-repository.js'

export class PrismaPostsRepository implements PostsRepository {
  async create(data: Prisma.PostUncheckedCreateInput) {
    return await prisma.post.create({ data })
  }

  async findById(id: number) {
    return await prisma.post.findFirst({
      where: { id },
    })
  }

  async findBy(where: Prisma.PostWhereUniqueInput) {
    return await prisma.post.findUnique({
      where,
    })
  }

  async update(id: number, data: Prisma.PostUpdateInput) {
    return await prisma.post.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return await prisma.post.delete({
      where: { id },
    })
  }

  async findAll() {
    return await prisma.post.findMany()
  }

  async findMostLikedPostsFromUser(idUser: number, tempoAnalise: Date) {

    return await prisma.post.findFirst({
      where: {
        autorId: idUser,
        createdAt: {
          gte: tempoAnalise,
        },
      },
      orderBy: {
        likes: {
          _count: 'desc', 
        }
      },
  
      include: {
        _count: {
          select: { likes: true }
        }
      }
    })
  }

  async FindFromUser(IdUser: number) {
    return await prisma.post.findMany({
      where: {
        autorId: IdUser,
      },
    })
  }

  async findLikes(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { likes: true },
    })

    return post ? post.likes : null
  }

  async findComments(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { comentarios: true },
    })

    return post ? post.comentarios : null
  }
}
