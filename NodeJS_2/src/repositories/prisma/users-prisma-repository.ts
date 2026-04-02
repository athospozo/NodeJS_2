import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { UsersRepository } from '../users-repository.js'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UsuarioCreateInput) {
    return await prisma.usuario.create({ data })
  }

  async findById(id: number) {
    return await prisma.usuario.findFirst({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.usuario.findFirst({
      where: {
        email,
      },
    })
  }

  async findBy(where: Prisma.UsuarioWhereUniqueInput) {
    return await prisma.usuario.findUnique({ where })
  }

  async update(id: string, data: Prisma.UsuarioUpdateInput) {
    return await prisma.usuario.update({
      where: {
        publicId: id,
      },
      data,
    })
  }

  async delete(email: string) {
    return await prisma.usuario.delete({
      where: {
        email,
      },
    })
  }

  async findAll() {
    return await prisma.usuario.findMany()
  }

  async findLikes(id: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: { likes: true },
    })

    return usuario ? usuario.likes : null
  }

  async findComments(id: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: { comentarios: true },
    })

    return usuario ? usuario.comentarios : null
  }
}
