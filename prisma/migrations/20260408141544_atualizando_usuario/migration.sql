/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "token" TEXT,
ADD COLUMN     "token_expires_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_token_key" ON "usuario"("token");
