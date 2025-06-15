/*
  Warnings:

  - You are about to drop the column `company_id` on the `product` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_company_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "company_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
