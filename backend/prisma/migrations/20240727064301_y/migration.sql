/*
  Warnings:

  - Changed the type of `loss` on the `Funds` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `income` on the `Funds` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `taxPaid` on the `Funds` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `taxPayable` on the `Funds` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Funds" DROP COLUMN "loss",
ADD COLUMN     "loss" INTEGER NOT NULL,
DROP COLUMN "income",
ADD COLUMN     "income" INTEGER NOT NULL,
DROP COLUMN "taxPaid",
ADD COLUMN     "taxPaid" INTEGER NOT NULL,
DROP COLUMN "taxPayable",
ADD COLUMN     "taxPayable" INTEGER NOT NULL;
