-- AlterTable
ALTER TABLE "ScoutProject" ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "website" SET DEFAULT '',
ALTER COLUMN "github" SET DEFAULT '';
