import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

export class ShowPostsUserUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute(idautor: number): Promise<Post[] | null> {
    // vamos checar a existencia do usuario:
    const user = await this.postsRepository.findById(idautor)

    if (!user) {
      throw new UserDoesntexist()
    }

    const posts = await this.postsRepository.FindFromUser(idautor)

    return posts
  }
}
