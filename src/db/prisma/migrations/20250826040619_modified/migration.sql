/*
  Warnings:

  - You are about to drop the column `amount` on the `InvoiceLine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."InvoiceLine" DROP COLUMN "amount",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
