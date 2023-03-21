/*
  Warnings:

  - Made the column `outputImage` on table `ImagePrompt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ImagePrompt" ALTER COLUMN "outputImage" SET NOT NULL;
