/*
  Warnings:

  - Added the required column `categoryId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookToCategory` (
    `categoryId` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`categoryId`, `bookId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookToCategory` ADD CONSTRAINT `BookToCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookToCategory` ADD CONSTRAINT `BookToCategory_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
