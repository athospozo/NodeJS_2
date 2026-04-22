import type { Comentario, Like, Prisma } from '@/@types/prisma/client.js'
export interface CommentsRepository {
  create(data: {
    conteudo: string
    idUser: number
    idPost: number
  }): Promise<Comentario>
  findAll(): Promise<Comentario[] | null>
  findBy(where: Prisma.ComentarioWhereUniqueInput): Promise<Comentario | null>
  delete(id: number): Promise<Comentario>
  update(id: number, conteudo: string): Promise<Comentario>
  findLikes(id: number): Promise<Like[] | null>
}
