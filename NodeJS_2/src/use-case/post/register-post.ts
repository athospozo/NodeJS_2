import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

interface RegisterPostUseCaseRequest {
  titulo: string
  Conteudo: string
  Idautor: string
}

type RegisterPostUseCaseResponse = {
  post: Post
}

export class RegisterPostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({
    titulo,
    Conteudo,
    Idautor,
  }: RegisterPostUseCaseRequest): Promise<RegisterPostUseCaseResponse> {
    const user = await this.usersRepository.findBy({ publicId: Idautor })

    if (!user) throw new UserDoesntexist()

    const post = await this.postsRepository.create({
      titulo,
      Conteudo,
      autorId: user.id,
    })

    return { post }
  }
}
