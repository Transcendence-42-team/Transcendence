/*
  Warnings:

  - You are about to drop the column `privmsg` on the `Chanel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chanel" DROP COLUMN "privmsg",
ADD COLUMN     "interlocutor_id" INTEGER;
