/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `unit_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `address` to the `volunteer_units` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `volunteer_units` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "volunteers" DROP CONSTRAINT "volunteers_unit_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "name",
DROP COLUMN "unit_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AlterTable
ALTER TABLE "volunteer_units" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- CreateTable
CREATE TABLE "AssignmentType" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "assignment_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "AssignmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" TEXT NOT NULL,
    "assignment_type_id" TEXT NOT NULL,
    "volunteer_id" TEXT NOT NULL,
    "photo" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentType_code_key" ON "AssignmentType"("code");

-- AddForeignKey
ALTER TABLE "volunteer_units" ADD CONSTRAINT "volunteer_units_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "volunteer_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assignment_type_id_fkey" FOREIGN KEY ("assignment_type_id") REFERENCES "AssignmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "volunteers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
