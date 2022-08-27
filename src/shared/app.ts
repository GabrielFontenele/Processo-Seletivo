import express, { Request, Response, NextFunction, Router } from 'express'

import 'express-async-errors'

// import { router } from "@routes/index";

import { AppError } from './errors/AppError'

export const app = express()

app.use(express.json())

const router = Router()

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)