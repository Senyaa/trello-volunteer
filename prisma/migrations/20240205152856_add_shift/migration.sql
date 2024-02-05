-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL,
    "started" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" TIMESTAMP(3),
    "shiftType" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnShift" (
    "userId" TEXT NOT NULL,
    "shiftId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnShift_pkey" PRIMARY KEY ("userId","shiftId")
);

-- CreateTable
CREATE TABLE "AnimalOnShift" (
    "id" TEXT NOT NULL,
    "animalTrelloId" TEXT NOT NULL,
    "shiftId" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,

    CONSTRAINT "AnimalOnShift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimalOnShift_animalTrelloId_shiftId_key" ON "AnimalOnShift"("animalTrelloId", "shiftId");

-- AddForeignKey
ALTER TABLE "UsersOnShift" ADD CONSTRAINT "UsersOnShift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnShift" ADD CONSTRAINT "UsersOnShift_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalOnShift" ADD CONSTRAINT "AnimalOnShift_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
