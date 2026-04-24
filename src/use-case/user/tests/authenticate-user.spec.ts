import { describe, expect, it, vi } from 'vitest'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { AuthenticateUserUseCase } from '../authenticate.js'

describe('Authenticate User', () => {
  it('deve retornar um token quando email e senha estiverem corretos', async () => {
    // arrange
    const emailTeste = 'athosp@email.com'
    const senhaTeste = 'senha-teste'

    const mockUser = {
      id: 1,
      publicId: 'public-id',
      role: 'DEFAULT',
      name: 'Athos',
      email: 'athosp@gmail.com',
      passwordHash: 'senha-hasheada-banco',
      createdAt: new Date(),
    }

    const mockUserRepository = {
      findByEmail: vi.fn().mockResolvedValue(mockUser),
    } as unknown as UsersRepository

    const mockHashProvider = {
      compare: vi.fn().mockResolvedValue(true),
    }

    const mockJwtProvider = {
      generate: vi.fn().mockReturnValue('token-falso-123'),
    }

    const sut = new AuthenticateUserUseCase(
      mockUserRepository,
      mockHashProvider,
      mockJwtProvider,
    )

    // act
    const response = await sut.execute({
      login: emailTeste,
      password: senhaTeste,
    })

    // assert
    expect(response.token).toBe('token-falso-123')

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(emailTeste)

    expect(mockHashProvider.compare).toHaveBeenCalledWith(
      'senha-teste',
      'senha-hasheada-banco',
    )
  })
})
