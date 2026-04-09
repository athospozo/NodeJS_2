export class UserNotFoundForPasswordResetError extends Error {
  constructor() {
    super("User not found for password reset.")
  }
}