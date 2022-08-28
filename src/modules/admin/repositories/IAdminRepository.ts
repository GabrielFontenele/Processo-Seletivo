import { User } from '@prisma/client'

export interface IAdminRepository {
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
}
