-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "phoneNumber" TEXT,
    "accountId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Account.customerId_unique" ON "Account"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.phoneNumber_unique" ON "Customer"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.accountId_unique" ON "Customer"("accountId");
