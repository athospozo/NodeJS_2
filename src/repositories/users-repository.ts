import type {
  Comentario,
  Like,
  Prisma,
  Usuario,
} from '@/@types/prisma/client.js'

export interface UsersRepository {
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>
  findById(id: number): Promise<Usuario | null>
  findBy(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario | null>
  findByEmail(email: string): Promise<Usuario | null>
  update(id: string, data: Prisma.UsuarioUpdateInput): Promise<Usuario>
  delete(email: string): Promise<Usuario>
  findAll(): Promise<Usuario[] | null>
  findLikes(id: number): Promise<Like[] | null>
  findComments(id: number): Promise<Comentario[] | null>
}
