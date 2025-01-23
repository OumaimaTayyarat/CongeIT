/*
  Warnings:

  - The values [PENDING,APPROVED,INMODERATION,REJECTED] on the enum `LeaveStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeaveStatus_new" AS ENUM ('APPROUVÉ', 'ATTENTE', 'MODÉRATION', 'REJETÉ');
ALTER TABLE "Leave" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Leave" ALTER COLUMN "status" TYPE "LeaveStatus_new" USING ("status"::text::"LeaveStatus_new");
ALTER TYPE "LeaveStatus" RENAME TO "LeaveStatus_old";
ALTER TYPE "LeaveStatus_new" RENAME TO "LeaveStatus";
DROP TYPE "LeaveStatus_old";
ALTER TABLE "Leave" ALTER COLUMN "status" SET DEFAULT 'ATTENTE';
COMMIT;

-- AlterTable
ALTER TABLE "Leave" ALTER COLUMN "status" SET DEFAULT 'ATTENTE';
