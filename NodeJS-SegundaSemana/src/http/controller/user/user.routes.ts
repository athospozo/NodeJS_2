import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt.js'
import { authenticate } from './authenticate.controller.js'
import { deleteUserbyEmail } from './delete.controller.js'
import { patchbyId } from './patch-by-id.controller.js'
import { readbyId } from './read-user-by-id.controller.js'
import { register } from './register.controller.js'
import { showAll } from './show-all.controller.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/authenticate', authenticate)

  app.get('/', showAll)
  app.delete('/', { onRequest: [verifyJWT] }, deleteUserbyEmail)
  app.patch('/', { onRequest: [verifyJWT] }, patchbyId)
  app.get('/:id', readbyId)
}
