import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { PostDoesntexist } from '../errors/post-does-not-exist.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'
import { youDontHavePermission } from '../errors/you-dont-have-permission.js'

// usuario que sera devolvido mostrando que foi apagado
type DeletedPostUseCaseResponse = {
  post: Post
}

export class DeletePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    publicIdPost: string,
    publicIdUser: string,
  ): Promise<DeletedPostUseCaseResponse> {
    // checamos se o post existe:
    const postWithSameId = await this.postsRepository.findBy({
      publicId: publicIdPost,
    })

    if (!postWithSameId) throw new PostDoesntexist()

    const user = await this.usersRepository.findBy({ publicId: publicIdUser })

    if (!user) throw new UserDoesntexist()

    if (postWithSameId.autorId !== user?.id) throw new youDontHavePermission()

    const postdeletado = await this.postsRepository.delete(postWithSameId.id)

    return { post: postdeletado }
  }
}
