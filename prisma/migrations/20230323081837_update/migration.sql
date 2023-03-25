/*
  Warnings:

  - Made the column `imageHeight` on table `ImagePrompt` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageWidth` on table `ImagePrompt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ImagePrompt" ALTER COLUMN "imageHeight" SET NOT NULL,
ALTER COLUMN "imageWidth" SET NOT NULL;
