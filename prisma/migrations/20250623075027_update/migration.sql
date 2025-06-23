-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "moodBoxId" TEXT,
ADD COLUMN     "weeklyFocusId" TEXT;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_moodBoxId_fkey" FOREIGN KEY ("moodBoxId") REFERENCES "MoodBox"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_weeklyFocusId_fkey" FOREIGN KEY ("weeklyFocusId") REFERENCES "WeeklyFocus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
