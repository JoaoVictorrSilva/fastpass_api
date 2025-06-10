/*
  Warnings:

  - You are about to drop the column `user_id` on the `extract` table. All the data in the column will be lost.
  - Added the required column `user_from_id` to the `extract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_to_id` to the `extract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "extract" DROP CONSTRAINT "extract_user_id_fkey";

-- AlterTable
ALTER TABLE "extract" DROP COLUMN "user_id",
ADD COLUMN     "user_from_id" INTEGER NOT NULL,
ADD COLUMN     "user_to_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "extract" ADD CONSTRAINT "extract_user_from_id_fkey" FOREIGN KEY ("user_from_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extract" ADD CONSTRAINT "extract_user_to_id_fkey" FOREIGN KEY ("user_to_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
