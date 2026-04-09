import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeForgotPasswordUseCase } from '@/use-case/factories/user/make-forgot-password-user-use-case.js'
import { logger } from '../../../lib/logger/index.js'
import { makeSendEmailUseCase } from '@/use-case/factories/user/make-send-email-user-use-case.js'
import { forgotPasswordTextTemplate } from '@/templates/forgot-password/forgot-password-text.js'
import { forgotPasswordHtmlTemplate } from '@/templates/forgot-password/forgot-password-html.js'
import { UserNotFoundForPasswordResetError } from '../../../use-case/errors/user-not-found-for-password-reset-error.js'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  try {
    const forgotPassawordSchema = z.object({
        login: z.email(),
    })

    const { login } = forgotPassawordSchema.parse(request.body)

    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    const { user, token } = await forgotPasswordUseCase.execute({ login })

    const sendEmailUseCase = makeSendEmailUseCase()

    await sendEmailUseCase.execute({
      to: user.email,
      subject: 'Recuperação de senha',
      message: forgotPasswordTextTemplate(user.name, token),
      html: forgotPasswordHtmlTemplate(user.name, token),
    })

    logger.info({ targetId: user.publicId }, 'Password reset email sent')

    return reply.status(200).send('Se o usuário existir, você receberá um e-mail com instruções para redefinir a senha.')
  } catch (error) {
    if (error instanceof UserNotFoundForPasswordResetError) {
      return reply.status(200).send({ message: error.message })
    }

    throw error
  }
}