/*
  Warnings:

  - A unique constraint covering the columns `[registrationNo]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registrationNo` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" ADD COLUMN     "registrationNo" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_registrationNo_key" ON "public"."Doctor"("registrationNo");
