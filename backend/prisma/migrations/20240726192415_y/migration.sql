-- CreateTable
CREATE TABLE "Funds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formNumber" TEXT NOT NULL,
    "loss" TEXT NOT NULL,
    "income" TEXT NOT NULL,
    "taxPaid" TEXT NOT NULL,
    "taxPayable" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Funds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funds_userId_key" ON "Funds"("userId");

-- AddForeignKey
ALTER TABLE "Funds" ADD CONSTRAINT "Funds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
