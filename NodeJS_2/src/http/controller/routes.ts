import type { FastifyInstance } from 'fastify'
import { commentsRoutes } from './cometario/comments.routes.js'
import { likesRoutes } from './like/likes.routes.js'
import { postRoutes } from './post/post.routes.js'
import { usersRoutes } from './user/user.routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/usuario' })

  app.register(postRoutes, { prefix: '/posts' })

  app.register(commentsRoutes, { prefix: '/comment' })

  app.register(likesRoutes, { prefix: '/like' })
}
