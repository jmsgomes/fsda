import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

const SEWER_INSPECTION_DATA_URL = 'https://sewerai-public.s3.us-west-2.amazonaws.com/sewer-inspections-part1.jsonl';

async function main() {
  console.log('Fetching data from', SEWER_INSPECTION_DATA_URL);
  const response = await fetch(SEWER_INSPECTION_DATA_URL);
  const body = await response.text();

  const lines = body.trim().split('\n');

  for (const line of lines) {
    const inspection = JSON.parse(line);
    console.log('Processing inspection:', inspection.id);

    await prisma.sewerInspection.create({
      data: {
        id: inspection.id,
        timestamp_utc: new Date(inspection.timestamp_utc),
        inspection_score: inspection.inspection_score,
        requires_repair: inspection.requires_repair,
        location: {
          create: {
            city: inspection.location.city,
            state: inspection.location.state,
            street: inspection.location.street,
            upstream_manhole: inspection.location.upstream_manhole,
            downstream_manhole: inspection.location.downstream_manhole,
          },
        },
        pipe: {
          create: {
            material: inspection.pipe.material,
            diameter_in: inspection.pipe.diameter_in,
            length_ft: inspection.pipe.length_ft,
            age_years: inspection.pipe.age_years,
          },
        },
        defects: {
          create: inspection.defects.map((defect: any) => ({
            code: defect.code,
            description: defect.description,
            severity: defect.severity,
            distance_ft: defect.distance_ft,
          })),
        },
      },
    });
  }

  console.log('Finished processing data.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });