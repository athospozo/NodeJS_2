import { env } from '@/env/index.js'

export function forgotPasswordTextTemplate(userName: string, token: string) {
//   const url = `${env.FRONTEND_URL}/reset-password/${token}`
  return `
Olá, ${userName}!

Recebemos uma solicitação para redefinir a sua senha. Para continuar, acesse o link abaixo:

link
token: ${token}

Se você não solicitou a recuperação de senha, ignore este e-mail.

Atenciosamente,
Athos Pozo
  `.trim()
}