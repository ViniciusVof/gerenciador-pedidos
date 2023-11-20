/*
  Warnings:

  - Changed the type of `addressNumber` on the `address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "addressNumber",
ADD COLUMN     "addressNumber" INTEGER NOT NULL;
