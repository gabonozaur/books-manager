/*
  Warnings:

  - Made the column `confirmString` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `confirmed` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `confirmString` VARCHAR(191) NOT NULL,
    MODIFY `confirmed` BOOLEAN NOT NULL DEFAULT false;
