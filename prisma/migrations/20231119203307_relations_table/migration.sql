/*
  Warnings:

  - You are about to drop the column `productId` on the `categories` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_productId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "productId",
ADD COLUMN     "restaurantId" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
