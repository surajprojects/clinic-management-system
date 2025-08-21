/*
  Warnings:

  - Added the required column `yearOfExperience` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" ADD COLUMN     "yearOfExperience" INTEGER NOT NULL;
