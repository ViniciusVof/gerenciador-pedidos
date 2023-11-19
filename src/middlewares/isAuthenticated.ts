import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import jwt from '../utils/jwt'

interface Payload {
  sub: string
  typeUser: string
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.json({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Token inválido',
    })
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = jwt.verify(token) as Payload

    req.userId = sub

    return next()
  } catch (err) {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Token inválido ou expirado',
    })
  }
}
