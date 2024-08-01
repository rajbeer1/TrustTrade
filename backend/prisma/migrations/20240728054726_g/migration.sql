/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Funds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Funds" DROP COLUMN "createdAt",
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "safetyRating" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "sumAssured" DOUBLE PRECISION NOT NULL DEFAULT 0;
