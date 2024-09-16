/*
  Warnings:

  - Added the required column `senha` to the `Membro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membroId` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Membro` ADD COLUMN `senha` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tarefa` ADD COLUMN `membroId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Tarefa` ADD CONSTRAINT `Tarefa_membroId_fkey` FOREIGN KEY (`membroId`) REFERENCES `Membro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
