import type { Comentario } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { PostDoesntexist } from '../errors/post-does-not-exist.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

interface RegisterCommentUseCaseRequest {
  conteudo: string
  idUsuario: string
  idPost: string
}

type RegisterCommentUseCaseResponse = {
  comentario: Comentario
}

export class RegisterComentarioUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    request: RegisterCommentUseCaseRequest,
  ): Promise<RegisterCommentUseCaseResponse> {
    // definimos o usuario:
    const user = await this.usersRepository.findBy({
      publicId: request.idUsuario,
    })

    if (!user) throw new UserDoesntexist()

    // definimos o post:
    const post = await this.postsRepository.findBy({ publicId: request.idPost })

    if (!post) throw new PostDoesntexist()

    // criamos a variavel que sera preenchida pelo comentario
    const comentario: Comentario = await this.commentsRepository.create({
      conteudo: request.conteudo,
      idUser: user.id,
      idPost: post.id,
    })

    return { comentario }
  }
}
