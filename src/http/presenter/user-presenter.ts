import type { Usuario } from '@/@types/prisma/index.js'

type HTTPUser = {
  id: string
  name: string
  email: string
  photo: string
}

export class UserPresenter {
  static toHTTP(user: Usuario): HTTPUser
  static toHTTP(users: Usuario[]): HTTPUser[]
  static toHTTP(input: Usuario | Usuario[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((user) => UserPresenter.toHTTP(user))
    }

    return {
      id: input.publicId,
      name: input.name,
      email: input.email,
      photo: input.photo,
    }
  }
}
