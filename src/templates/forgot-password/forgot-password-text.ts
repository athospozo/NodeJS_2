export function forgotPasswordTextTemplate(userName: string, token: string) {
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
