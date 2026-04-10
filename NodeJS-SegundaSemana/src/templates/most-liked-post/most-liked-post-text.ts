export function mostLikedPostTextTemplate(userName: string, likes: number, postTitle: string) {
  return `
Olá, ${userName}!

Seu post mais curtido nas últimas 24 horas foi:

${postTitle}

Com um total de ${likes} curtidas! Parabéns!

Voce só está no começo! Continue criando e compartilhando esse conteúdo incrível!!!

Atenciosamente,
Athos Pozo
  `.trim()
}