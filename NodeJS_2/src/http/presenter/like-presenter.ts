import type { Like } from '@/@types/prisma/index.js'

type HTTPPost = {
  id: string
}

export class LikePresenter {
  static toHTTP(post: Like): HTTPPost
  static toHTTP(posts: Like[]): HTTPPost[]
  static toHTTP(input: Like | Like[]): HTTPPost | HTTPPost[] {
    if (Array.isArray(input)) {
      return input.map((post) => LikePresenter.toHTTP(post))
    }

    return {
      id: input.publicId,
    }
  }
}
