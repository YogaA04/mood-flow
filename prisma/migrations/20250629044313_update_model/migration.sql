/*
  Warnings:

  - You are about to drop the column `description` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `timeBlock` on the `Routine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "description",
DROP COLUMN "done",
DROP COLUMN "timeBlock";

-- CreateTable
CREATE TABLE "MyDayRoutine" (
    "id" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MyDayRoutine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutineTimer" (
    "id" TEXT NOT NULL,
    "myDayRoutineId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "RoutineTimer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MyDayRoutine_userId_date_idx" ON "MyDayRoutine"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "RoutineTimer_myDayRoutineId_key" ON "RoutineTimer"("myDayRoutineId");

-- AddForeignKey
ALTER TABLE "MyDayRoutine" ADD CONSTRAINT "MyDayRoutine_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MyDayRoutine" ADD CONSTRAINT "MyDayRoutine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineTimer" ADD CONSTRAINT "RoutineTimer_myDayRoutineId_fkey" FOREIGN KEY ("myDayRoutineId") REFERENCES "MyDayRoutine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
