-- CreateTable
CREATE TABLE "ImageUrl" (
    "attachmentId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageUrl_pkey" PRIMARY KEY ("attachmentId")
);
