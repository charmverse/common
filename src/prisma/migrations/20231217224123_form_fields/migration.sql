-- CreateEnum
CREATE TYPE "FormFieldType" AS ENUM ('short_text', 'long_text', 'number', 'email', 'phone', 'url', 'select', 'multiselect', 'wallet', 'date', 'person', 'label');

-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "formId" UUID;

-- CreateTable
CREATE TABLE "Form" (
    "id" UUID NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormField" (
    "id" UUID NOT NULL,
    "type" "FormFieldType" NOT NULL,
    "index" INTEGER NOT NULL DEFAULT -1,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "parentFieldId" UUID,
    "formId" UUID NOT NULL,

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormFieldValue" (
    "id" UUID NOT NULL,
    "fieldId" UUID NOT NULL,
    "type" "FormFieldType" NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "FormFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FormFieldValue_fieldId_idx" ON "FormFieldValue"("fieldId");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormFieldValue" ADD CONSTRAINT "FormFieldValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "FormField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
