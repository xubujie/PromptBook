/*
  Warnings:

  - A unique constraint covering the columns `[userId,imagePromptId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,languagePromptId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "imagePromptId" DROP NOT NULL,
ALTER COLUMN "languagePromptId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_imagePromptId_key" ON "Like"("userId", "imagePromptId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_languagePromptId_key" ON "Like"("userId", "languagePromptId");
