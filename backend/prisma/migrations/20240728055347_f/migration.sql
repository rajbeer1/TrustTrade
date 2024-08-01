/*
  Warnings:

  - You are about to drop the column `registeredAt` on the `Funds` table. All the data in the column will be lost.
  - You are about to drop the column `safetyRating` on the `Funds` table. All the data in the column will be lost.
  - You are about to drop the column `sumAssured` on the `Funds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Funds" DROP COLUMN "registeredAt",
DROP COLUMN "safetyRating",
DROP COLUMN "sumAssured",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "safetyRating" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "sumAssured" DOUBLE PRECISION NOT NULL DEFAULT 0;
