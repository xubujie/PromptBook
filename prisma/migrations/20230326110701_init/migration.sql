/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `UserFollow` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `UserFollow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,promptId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorEmail` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorEmail` to the `Prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerEmail` to the `UserFollow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingEmail` to the `UserFollow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollow" DROP CONSTRAINT "UserFollow_followingId_fkey";

-- DropIndex
DROP INDEX "Like_userId_promptId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL,
ADD COLUMN     "link" TEXT;

-- AlterTable
ALTER TABLE "UserFollow" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "followerEmail" TEXT NOT NULL,
ADD COLUMN     "followingEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_userEmail_promptId_key" ON "Like"("userEmail", "promptId");

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingEmail_fkey" FOREIGN KEY ("followingEmail") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerEmail_fkey" FOREIGN KEY ("followerEmail") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
