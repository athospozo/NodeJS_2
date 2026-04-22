export function mostLikedPostHtmlTemplate(
  userName: string,
  likes: number,
  postTitle: string,
) {
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Olá, ${userName}!</h2>
      <p>
        Seu post mais curtido nas últimas 24 horas foi:
      </p>
      <p style="text-align: center; margin: 32px 0;">
        <strong style="font-size: 18px; color: #1976d2;">${postTitle}</strong>
      </p>
      <p>
        Com um total de <strong style="color: #1976d2;">${likes} curtidas</strong>! Parabéns!
      </p>
      <p>
        Voce só está no começo! Continue criando e compartilhando esse conteúdo incrível!!!
      </p>
      <br>
      <p>
        Atenciosamente,<br>
        Athos Pozo
      </p>
    </div>
  `
}
