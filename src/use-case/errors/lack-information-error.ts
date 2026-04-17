export class lackInformationError extends Error {
  constructor() {
    super('Your scope is lacking information')
  }
}
