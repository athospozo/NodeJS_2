import type { PostComLikes } from '@/@types/payloads/post.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

type GetPostUseCaseResponse = {
  post: PostComLikes
}

/* Aqui, a classe é responável por pegar os posts mais curtidos de cada usuário e armazena-los
   juntamente com o publicid do usuário para que depois seja enviado o email, a classe recebe o usuário
   e retorna seu post mais curtido nas últimas 24 horas, caso não exista ela não retorna nada */

export class MostLikedUserPost {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(publicUserId: string): Promise<GetPostUseCaseResponse | null> {
    const tempoAnalise = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const user = await this.usersRepository.findBy({ publicId: publicUserId })

    if (!user) {
      return null
    }

    const post = await this.postsRepository.findMostLikedPostsFromUser(
      user.id,
      tempoAnalise,
    )

    if (!post) {
      return null
    }

    return { post }
  }
}
