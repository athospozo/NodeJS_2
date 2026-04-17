import type { PostComLikes } from '@/@types/payloads/post.js'
import type { Comentario, Like, Post, Prisma } from '@/@types/prisma/client.js'

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
  findById(id: number): Promise<Post | null>
  findBy(where: Prisma.PostWhereUniqueInput): Promise<Post | null>
  update(id: number, data: Prisma.PostUpdateInput): Promise<Post>
  delete(id: number): Promise<Post>
  findAll(): Promise<Post[] | null>
  findMostLikedPostsFromUser(
    idUser: number,
    tempoAnalise: Date,
  ): Promise<PostComLikes | null>
  FindFromUser(IdUser: number): Promise<Post[] | null>
  findLikes(id: number): Promise<Like[] | null>
  findComments(id: number): Promise<Comentario[] | null>
}
