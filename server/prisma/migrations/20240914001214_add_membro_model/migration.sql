-- AlterTable
ALTER TABLE `Tarefa` MODIFY `prioridade` ENUM('ALTA', 'MEDIA', 'BAIXA') NOT NULL DEFAULT 'BAIXA';

-- CreateTable
CREATE TABLE `Membro` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Membro_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
