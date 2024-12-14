/*
  Warnings:

  - You are about to drop the column `endTime` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Show` table. All the data in the column will be lost.
  - Added the required column `end` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Show" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
