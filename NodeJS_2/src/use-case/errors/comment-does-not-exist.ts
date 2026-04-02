export class commentDoesNotexist extends Error {
  constructor() {
    super('Comment does not exist')
  }
}
