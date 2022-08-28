import { User } from '@prisma/client'
import { prisma } from '@shared/prisma'
import { IAdminRepository } from '../IAdminRepository'

export class AdminRepositoryPrisma implements IAdminRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
