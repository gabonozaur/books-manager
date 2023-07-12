/*
  Warnings:

  - You are about to drop the column `categoryId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `categoryId`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `bookId`;
