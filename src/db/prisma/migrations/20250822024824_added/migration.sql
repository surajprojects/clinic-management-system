/*
  Warnings:

  - Added the required column `shift` to the `Receptionist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Shift" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'NIGHT');

-- AlterTable
ALTER TABLE "public"."Receptionist" ADD COLUMN     "deskNumber" TEXT,
ADD COLUMN     "shift" "public"."Shift" NOT NULL;
