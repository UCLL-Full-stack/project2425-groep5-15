/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_showId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "_ShowToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ShowToUser_AB_unique" ON "_ShowToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ShowToUser_B_index" ON "_ShowToUser"("B");

-- AddForeignKey
ALTER TABLE "_ShowToUser" ADD CONSTRAINT "_ShowToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToUser" ADD CONSTRAINT "_ShowToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
