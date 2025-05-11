/*
  Warnings:

  - Changed the type of `user_type` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('ADMIN', 'COMMON', 'SUPPLIER');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "user_type",
ADD COLUMN     "user_type" "user_type" NOT NULL;
