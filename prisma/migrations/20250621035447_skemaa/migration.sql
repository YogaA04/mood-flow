/*
  Warnings:

  - You are about to drop the column `duration` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `cretateAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoodCheck` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mood` to the `Routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Routine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_userId_fkey";

-- DropForeignKey
ALTER TABLE "MoodCheck" DROP CONSTRAINT "MoodCheck_userId_fkey";

-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "duration",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cretateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "MoodCheck";

-- DropEnum
DROP TYPE "ActivityType";

-- DropEnum
DROP TYPE "MoodType";
