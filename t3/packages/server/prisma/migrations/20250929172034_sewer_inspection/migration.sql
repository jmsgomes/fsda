/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SewerInspection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp_utc" DATETIME NOT NULL,
    "locationId" INTEGER NOT NULL,
    "pipeId" INTEGER NOT NULL,
    "inspection_score" REAL NOT NULL,
    "requires_repair" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SewerInspection_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SewerInspection_pipeId_fkey" FOREIGN KEY ("pipeId") REFERENCES "Pipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "upstream_manhole" TEXT NOT NULL,
    "downstream_manhole" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "material" TEXT NOT NULL,
    "diameter_in" REAL NOT NULL,
    "length_ft" REAL NOT NULL,
    "age_years" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Defect" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "distance_ft" REAL NOT NULL,
    "inspectionId" TEXT NOT NULL,
    CONSTRAINT "Defect_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "SewerInspection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SewerInspection_locationId_key" ON "SewerInspection"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "SewerInspection_pipeId_key" ON "SewerInspection"("pipeId");
