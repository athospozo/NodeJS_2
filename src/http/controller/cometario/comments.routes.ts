import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { deleteComment } from './delete.controller.js'
import { listComments } from './list.controller.js'
import { readPostComments } from './list-post-comments.controller.js'
import { readUserComments } from './list-user-comments.controller.js'
import { patchComment } from './patch.controller.js'
import { readComment } from './read.controller.js'
import { registerComment } from './register.controller.js'

export async function commentsRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, registerComment)

  app.get('/acomment/:id', readComment)
  app.get('/allcomments', listComments)
  app.get('/usercomments/:id', readUserComments)
  app.get('/postcomments/:id', readPostComments)

  app.patch('/:id', { onRequest: [verifyJWT] }, patchComment)

  app.delete('/:id', { onRequest: [verifyJWT] }, deleteComment)
}
