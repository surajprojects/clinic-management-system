-- DropIndex
DROP INDEX "public"."PatientOnDoctor_doctorId_key";

-- DropIndex
DROP INDEX "public"."PatientOnDoctor_patientId_key";

-- AlterTable
ALTER TABLE "public"."PatientOnDoctor" ADD CONSTRAINT "PatientOnDoctor_pkey" PRIMARY KEY ("patientId", "doctorId");
