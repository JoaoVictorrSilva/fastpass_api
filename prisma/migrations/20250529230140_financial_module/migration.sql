-- CreateEnum
CREATE TYPE "TypeMoviment" AS ENUM ('DEBIT', 'CREDIT');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "balance" BIGINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "extract" (
    "id" SERIAL NOT NULL,
    "value" BIGINT NOT NULL,
    "moviment" "TypeMoviment" NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "extract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "extract" ADD CONSTRAINT "extract_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
