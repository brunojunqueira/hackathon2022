/*
  Warnings:

  - Added the required column `avatar_url` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "avatar_url" TEXT NOT NULL;
