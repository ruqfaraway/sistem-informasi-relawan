/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `education_levels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `occupations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `volunteer_types` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `education_levels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `occupations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `volunteer_types` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "education_levels_education_key";

-- DropIndex
DROP INDEX "occupations_occupation_key";

-- DropIndex
DROP INDEX "volunteer_types_volunteer_type_key";

-- AlterTable
ALTER TABLE "education_levels" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "occupations" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "volunteer_types" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "education_levels_code_key" ON "education_levels"("code");

-- CreateIndex
CREATE UNIQUE INDEX "occupations_code_key" ON "occupations"("code");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_types_code_key" ON "volunteer_types"("code");
