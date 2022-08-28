import { PrismaClient, Prisma } from '@prisma/client'
import { hashSync } from 'bcryptjs'
const prisma = new PrismaClient()

const turnoData: Prisma.TurnoCreateInput[] = [
  { name: 'vespertino' },
  { name: 'matutino' },
]

const serieData: Prisma.SerieCreateInput[] = [
  { name: '1ª serie' },
  { name: '2ª serie' },
]
const password = hashSync('admin', 8)
const adminData: Prisma.UserCreateInput = {
  name: 'admin',
  email: 'admin@example.com',
  password,
  admin: true,
}

async function main() {
  await prisma.turno.createMany({ data: turnoData })
  await prisma.serie.createMany({ data: serieData })
  await prisma.user.create({ data: adminData })
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
