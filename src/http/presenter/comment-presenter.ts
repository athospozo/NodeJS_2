import type { Comentario } from '@/@types/prisma/index.js'

type HTTPPost = {
  id: string
  conteudo: string
  createdat: Date
}

export class CommentPresenter {
  static toHTTP(post: Comentario): HTTPPost
  static toHTTP(posts: Comentario[]): HTTPPost[]
  static toHTTP(input: Comentario | Comentario[]): HTTPPost | HTTPPost[] {
    if (Array.isArray(input)) {
      return input.map((post) => CommentPresenter.toHTTP(post))
    }

    return {
      id: input.publicId,
      conteudo: input.conteudo,
      createdat: input.createdAt,
    }
  }
}
