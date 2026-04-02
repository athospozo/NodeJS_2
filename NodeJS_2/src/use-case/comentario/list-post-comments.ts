import type { Comentario } from '@/@types/prisma/index.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { PostDoesntexist } from '../errors/post-does-not-exist.js'

export class ReadPostComments {
  constructor(private postRepository: PostsRepository) {}

  async execute(publicId: string): Promise<Comentario[] | null> {
    // verificamos se o usuario existe:
    const post = await this.postRepository.findBy({ publicId: publicId })

    if (!post) throw new PostDoesntexist()

    const comments = await this.postRepository.findComments(post.id)

    return comments
  }
}
