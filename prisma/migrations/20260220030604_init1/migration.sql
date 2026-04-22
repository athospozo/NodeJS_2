/*
  Warnings:

  - You are about to drop the column `picture` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "picture",
ADD COLUMN     "photo" TEXT NOT NULL DEFAULT '';
