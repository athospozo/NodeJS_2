import type { Like } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { PostDoesntexist } from '../errors/post-does-not-exist.js'

export class ReadPostLikes {
  constructor(private postRepository: PostsRepository) {}

  async execute(publicId: string): Promise<Like[] | null> {
    // verificamos se o usuario existe:
    const post = await this.postRepository.findBy({ publicId: publicId })

    if (!post) throw new PostDoesntexist()

    const likes = await this.postRepository.findLikes(post.id)

    return likes
  }
}
