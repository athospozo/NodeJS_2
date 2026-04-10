export function forgotPasswordHtmlTemplate(userName: string, token: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Olá, ${userName}!</h2>
      <p>
        Sua solicitação para troca de senha foi recebida.<br>
        Seu token de recuperação de senha é:
      </p>
      <p style="text-align: center; margin: 32px 0;">
        <strong style="font-size: 18px; color: #1976d2;">${token}</strong>
      </p>
      <p>
        Para continuar, clique no botão abaixo:
      </p>
      <p style="text-align: center; margin: 32px 0;">
        <a href="${token}" style="background: #1976d2; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          Recuperar Senha
        </a>
      </p>
      <p>
        Se você não solicitou a recuperação de senha, ignore este e-mail.
      </p>
      <p>
        Atenciosamente,<br>
        Athos Pozo
      </p>
    </div>
  `
}
