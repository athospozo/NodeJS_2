import type { Prisma } from '@/@types/prisma/client.js'

export type PostComLikes = Prisma.PostGetPayload<{
  include: {
    _count: {
      select: {
        likes: true
      }
    }
  }
}>
