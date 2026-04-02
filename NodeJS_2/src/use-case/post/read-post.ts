import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { PostDoesntexist } from '../errors/post-does-not-exist.js'

type GetPostUseCaseResponse = {
  post: Post
}

export class ReadPostById {
  constructor(private postsRepository: PostsRepository) {}
  async execute(id: number): Promise<GetPostUseCaseResponse> {
    const post = await this.postsRepository.findById(id)

    if (!post) throw new PostDoesntexist()

    return { post }
  }
}
