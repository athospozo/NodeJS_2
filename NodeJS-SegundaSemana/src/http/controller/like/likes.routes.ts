import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { deleteLike } from './delete.controller.js'
import { ReadCommentLikes } from './list-comment-likes.controller.js'
import { ReadPostLikes } from './list-post-likes.controller.js'
import { ReadUserLikes } from './list-user-likes.controller.js'
import { readLike } from './read.controller.js'
import { registerLike } from './register.controller.js'

export async function likesRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, registerLike)

  app.get('/alike/:id', readLike)
  app.get('/userlikes/:id', ReadUserLikes)
  app.get('/postlikes/:id', ReadPostLikes)
  app.get('/commentlikes/:id', ReadCommentLikes)

  app.delete('/', { onRequest: [verifyJWT] }, deleteLike)
}
