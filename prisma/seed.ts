import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const turnoData: Prisma.TurnoCreateInput[] = [
  { name: 'vespertino' },
  { name: 'matutino' },
]

const serieData: Prisma.SerieCreateInput[] = [
  { name: '1ª serie' },
  { name: '2ª serie' },
]

async function main() {
  await prisma.turno.createMany({ data: turnoData })
  await prisma.serie.createMany({ data: serieData })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
