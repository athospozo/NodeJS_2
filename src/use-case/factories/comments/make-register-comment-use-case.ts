import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RegisterComentarioUseCase } from '@/use-case/comentario/register-coments.js'

export function makeRegisterCommentsUseCase() {
  const commentRepository = new PrismaCommentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const postRepository = new PrismaPostsRepository()
  const registerCommentsUseCase = new RegisterComentarioUseCase(
    commentRepository,
    postRepository,
    usersRepository,
  )

  return registerCommentsUseCase
}
