/*
  Warnings:

  - Made the column `ipAddress` on table `View` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `View` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `View` MODIFY `resourceType` VARCHAR(191) NULL,
    MODIFY `ipAddress` VARCHAR(191) NOT NULL,
    MODIFY `location` JSON NOT NULL;
