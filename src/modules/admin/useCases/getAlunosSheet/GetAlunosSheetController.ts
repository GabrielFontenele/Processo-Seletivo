import { AdminRepositoryPrisma } from '@modules/admin/repositories/prisma/AdminRepositoryPrisma'
import { Request, Response } from 'express'
import xlsx, { WorkSheet } from 'node-xlsx'
import { GetAlunosSheetUseCase } from './GetAlunosSheetUseCase'

export class GetAlunosSheetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminRepositoryPrisma = new AdminRepositoryPrisma()
    const getAlunosSheetUseCase = new GetAlunosSheetUseCase(
      adminRepositoryPrisma,
    )

    const data = await getAlunosSheetUseCase.execute()
    const buffer = xlsx.build([{ name: 'mySheetName', data } as WorkSheet])
    response.writeHead(200, {
      'Content-Type': 'application/vnd.openxmlformats',
      'Content-disposition': 'attachment; filename=Report.xlsx',
    })

    return response.end(buffer)
  }
}
