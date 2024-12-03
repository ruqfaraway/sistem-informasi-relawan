/*
  Warnings:

  - The primary key for the `volunteers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gol_dar` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `nrp` on the `volunteers` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `volunteers` table. All the data in the column will be lost.
  - Added the required column `blood_type` to the `volunteers` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `volunteers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `position_id` to the `volunteers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religion_id` to the `volunteers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volunteer_id` to the `volunteers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "volunteers" DROP CONSTRAINT "volunteers_pkey",
DROP COLUMN "gol_dar",
DROP COLUMN "nrp",
DROP COLUMN "position",
ADD COLUMN     "blood_type" "BloodType" NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "position_id" TEXT NOT NULL,
ADD COLUMN     "religion_id" TEXT NOT NULL,
ADD COLUMN     "volunteer_id" TEXT NOT NULL,
ALTER COLUMN "period" DROP NOT NULL,
ADD CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "religions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "religions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "religions_code_key" ON "religions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "positions_code_key" ON "positions"("code");

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_religion_id_fkey" FOREIGN KEY ("religion_id") REFERENCES "religions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
