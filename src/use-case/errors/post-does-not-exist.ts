export class PostDoesntexist extends Error {
  constructor() {
    super('Post does not exist!')
  }
}
