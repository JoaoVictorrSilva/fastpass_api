-- CreateEnum
CREATE TYPE "TipoMovimentacao" AS ENUM ('DEBITO', 'CREDITO', 'DEPOSITO', 'SAQUE', 'TRANSFERENCIA');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "extrato" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" "TipoMovimentacao" NOT NULL,
    "descricao" TEXT NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "extrato_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extrato" ADD CONSTRAINT "extrato_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extrato" ADD CONSTRAINT "extrato_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
