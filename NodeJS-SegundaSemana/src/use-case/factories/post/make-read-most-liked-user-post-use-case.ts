import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { MostLikedUserPost } from '@/use-case/post/most-liked-user-post.js'

export function makeReadMostLikedUserPostUseCase() {

  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const mostLikedUserPostUseCase = new MostLikedUserPost(postsRepository, usersRepository)

  return mostLikedUserPostUseCase
}