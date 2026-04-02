export class UserDoesntexist extends Error {
  constructor() {
    super('User does not exist!')
  }
}
