import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'secret'

interface JWTPayload {
  id: string
  fullname: string
  email: string
  phoneNumber: string
  userTypesId: string
}

interface CustomerJWTPayload {
  id: string
  fullname: string
  email: string
  phoneNumber: string
  restaurantId: string
}

export default {
  sign: (payload: JWTPayload) =>
    jwt.sign(payload, SECRET, {
      subject: payload.id,
      expiresIn: '1h',
      algorithm: 'HS256',
    }),
  signCustomer: (payload: CustomerJWTPayload) =>
    jwt.sign(payload, SECRET, {
      subject: payload.id,
      expiresIn: '1h',
      algorithm: 'HS256',
    }),
  verify: (token: string) => jwt.verify(token, SECRET),
}
