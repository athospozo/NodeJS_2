import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { PostDoesntexist } from '../errors/post-does-not-exist.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'
import { youDontHavePermission } from '../errors/you-dont-have-permission.js'

interface PatchPostUseCaseRequest {
  titulo?: string | undefined
  Conteudo?: string | undefined
}

type PatchPostUseCaseResponse = {
  post: Post
}

export class PatchPostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute(
    id: string,
    { titulo, Conteudo }: PatchPostUseCaseRequest,
    publicIdUser: string,
  ): Promise<PatchPostUseCaseResponse> {
    let post = await this.postsRepository.findBy({ publicId: id })

    // caso post nao exista:
    if (!post) throw new PostDoesntexist()

    const user = await this.usersRepository.findBy({ publicId: publicIdUser })

    if (!user) throw new UserDoesntexist()

    if (post.autorId !== user.id) throw new youDontHavePermission()

    const dataToUpdate: Record<string, string> = {}

    titulo !== undefined ? { titulo } : {}

    Conteudo !== undefined ? { Conteudo } : {}

    post = await this.postsRepository.update(user.id, dataToUpdate)

    return { post }
  }
}
