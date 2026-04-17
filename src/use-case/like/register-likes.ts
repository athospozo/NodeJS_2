import type { Like } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { commentDoesNotexist } from '../errors/comment-does-not-exist.js'
import { lackInformationError } from '../errors/lack-information-error.js'
import { PostDoesntexist } from '../errors/post-does-not-exist.js'
import { UserDoesntexist } from '../errors/user-does-not-exist.js'

interface RegisterLikeUseCaseRequest {
  idUser: string
  idPost?: string | undefined
  idComentario?: string | undefined
}

type RegisterLikeUseCaseResponse = {
  like: Like
}

export class RegisterLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private commentsRepository: CommentsRepository,
    private postRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute(
    request: RegisterLikeUseCaseRequest,
  ): Promise<RegisterLikeUseCaseResponse> {
    const user = await this.usersRepository.findBy({ publicId: request.idUser })

    if (!user) {
      throw new UserDoesntexist()
    }

    let like: Like = {} as Like

    if (!request.idPost && !request.idComentario) {
      throw new lackInformationError()
    } else if (request.idPost) {
      const publicIdPost = request.idPost
      const post = await this.postRepository.findBy({ publicId: publicIdPost })

      if (!post) {
        throw new PostDoesntexist()
      }

      like = await this.likesRepository.create({
        idUser: user.id,
        idPost: post.id,
      })
    } else if (request.idComentario) {
      const publicIdComentario = request.idComentario
      const comentario = await this.commentsRepository.findBy({
        publicId: publicIdComentario,
      })

      if (!comentario) {
        throw new commentDoesNotexist()
      }

      like = await this.likesRepository.create({
        idUser: user.id,
        idComentario: comentario.id,
      })
    }

    return { like }
  }
}
