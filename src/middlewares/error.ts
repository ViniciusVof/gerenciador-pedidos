import { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    return res.status(400).json({
      status: 'error',
      message: err.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
