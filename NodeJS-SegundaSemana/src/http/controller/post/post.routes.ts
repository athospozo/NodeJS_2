import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { deletePostbyId } from './delete-by-id.js'
import { getbyIdUsers } from './get-by-id.controller.js'
import { patchbyId } from './patch-by-id.controller.js'
import { readbyId } from './read-post-by-id.controller.js'
import { register } from './register.controller.js'
import { showAll } from './show-all.controller.js'

export async function postRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJWT] }, register)

  app.get('/', showAll)
  app.get('/usuario/:iduser', getbyIdUsers)
  app.get('/:id', readbyId)

  app.delete('/:publicPostId', { onRequest: [verifyJWT] }, deletePostbyId)

  app.patch('/:id', { onRequest: [verifyJWT] }, patchbyId)
}
