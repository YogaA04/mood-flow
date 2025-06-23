/*
  Warnings:

  - You are about to drop the column `activity` on the `MoodBox` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `Routine` table. All the data in the column will be lost.
  - Made the column `moodBoxId` on table `Routine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Routine" DROP CONSTRAINT "Routine_moodBoxId_fkey";

-- AlterTable
ALTER TABLE "MoodBox" DROP COLUMN "activity";

-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "mood",
ALTER COLUMN "moodBoxId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_moodBoxId_fkey" FOREIGN KEY ("moodBoxId") REFERENCES "MoodBox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
