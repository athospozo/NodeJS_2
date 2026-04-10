import cron from 'node-cron'
import { makeReadMostLikedUserPostUseCase } from '@/use-case/factories/post/make-read-most-liked-user-post-use-case.js'
import { makeShowAllUsersUseCase } from '@/use-case/factories/user/make-show-all-use-case.js'
import { makeSendEmailUseCase } from '@/use-case/factories/user/make-send-email-user-use-case.js';
import { mostLikedPostTextTemplate } from '@/templates/most-liked-post/most-liked-post-text.js';
import { mostLikedPostHtmlTemplate } from '@/templates/most-liked-post/most-liked-post-html.js';
import { logger } from '@/lib/logger/index.js';
import { env } from '@/env/index.js'

/* Aqui ocorre a união das construções dos casos de uso para a busca do post campeão */

export const enviarEmailsDestaqueJob = cron.schedule(env.CRON_SCHEDULE,
  async () => {
  console.log('Enviando emails');

  try {
    const obterUsuarios = makeShowAllUsersUseCase();
    const obterPostCampeao = makeReadMostLikedUserPostUseCase()
    const sendEmailUseCase = makeSendEmailUseCase()

    const usuarios = await obterUsuarios.execute();

    if (!usuarios) return;

    for (const usuario of usuarios) {
      try {

        const resultado = await obterPostCampeao.execute(usuario.publicId)

        if (resultado != null && resultado.post != null) {
            
          console.log(`Preparando e-mail para usuário ${usuario.name}`)
          
          await sendEmailUseCase.execute({
            to: usuario.email,
            subject: 'Veja seu post mais curtido das últimas 24 horas!',
            message: mostLikedPostTextTemplate(usuario.name, resultado.post._count.likes, resultado.post.titulo),
            html: mostLikedPostHtmlTemplate(usuario.name, resultado.post._count.likes, resultado.post.titulo),
          })
    
          logger.info({ targetId: usuario.publicId }, 'Most liked post email sent')
        }

      } catch (error) {
        console.error(`Erro ao processar usuário ${usuario.name}: ${usuario.publicId}:`, error)
      }
    }

    console.log('Emails enviados com sucesso!')

  } catch (error) {
    console.error('Falha na execução do job:', error)
  }
}, 
//@ts-expect-error
{ scheduled: false } 
);