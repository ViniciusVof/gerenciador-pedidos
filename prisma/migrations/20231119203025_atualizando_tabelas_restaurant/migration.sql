/*
  Warnings:

  - You are about to drop the column `categoryId` on the `restaurants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_categoryId_fkey";

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "categoryId";
