import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'

export class ShowAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute(): Promise<Post[] | null> {
    const posts = await this.postsRepository.findAll()

    return posts
  }
}
