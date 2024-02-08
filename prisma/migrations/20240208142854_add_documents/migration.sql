-- CreateTable
CREATE TABLE "Documents" (
    "documentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("documentId")
);
