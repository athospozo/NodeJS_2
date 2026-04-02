import type { Post } from '@/@types/prisma/index.js'

type HTTPPost = {
  id: string
  titulo: string
  conteudo: string
  createdat: Date
}

export class PostPresenter {
  static toHTTP(post: Post): HTTPPost
  static toHTTP(posts: Post[]): HTTPPost[]
  static toHTTP(input: Post | Post[]): HTTPPost | HTTPPost[] {
    if (Array.isArray(input)) {
      return input.map((post) => PostPresenter.toHTTP(post))
    }

    return {
      id: input.publicId,
      titulo: input.titulo,
      conteudo: input.Conteudo,
      createdat: input.createdAt,
    }
  }
}
