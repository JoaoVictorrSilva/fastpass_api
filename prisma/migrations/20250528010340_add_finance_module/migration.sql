/*
  Warnings:

  - You are about to drop the column `saldo` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `extrato` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeMoviment" AS ENUM ('DEBIT', 'CREDIT', 'DEPOSIT', 'TRANSFER');

-- DropForeignKey
ALTER TABLE "extrato" DROP CONSTRAINT "extrato_company_id_fkey";

-- DropForeignKey
ALTER TABLE "extrato" DROP CONSTRAINT "extrato_pessoa_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "saldo",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "extrato";

-- DropEnum
DROP TYPE "TipoMovimentacao";

-- CreateTable
CREATE TABLE "extract" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "TypeMoviment" NOT NULL,
    "description" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "extract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extract" ADD CONSTRAINT "extract_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extract" ADD CONSTRAINT "extract_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
