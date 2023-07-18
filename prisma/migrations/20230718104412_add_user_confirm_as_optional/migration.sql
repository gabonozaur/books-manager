/*
  Warnings:

  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `confirmString` VARCHAR(191) NULL,
    ADD COLUMN `confirmed` BOOLEAN NULL DEFAULT false,
    MODIFY `name` VARCHAR(191) NOT NULL;
