-- DropIndex
DROP INDEX "Funds_userId_key";

-- AlterTable
ALTER TABLE "Funds" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
