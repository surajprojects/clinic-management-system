/*
  Warnings:

  - You are about to drop the column `isActive` on the `InvoiceLine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."InvoiceItem" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."InvoiceLine" DROP COLUMN "isActive";
