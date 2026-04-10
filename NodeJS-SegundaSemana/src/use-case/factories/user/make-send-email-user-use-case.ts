import { SendEmailUseCase } from '@/use-case/messaging/send-email.js'

export function makeSendEmailUseCase() {
  return new SendEmailUseCase()
}
