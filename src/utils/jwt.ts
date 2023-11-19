import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'secret'

interface JWTPayload {
  id: string
  fullname: string
  email: string
  phoneNumber: string
  userTypesId: string
}

export default {
  sign: (payload: JWTPayload) =>
    jwt.sign(payload, SECRET, {
      subject: payload.id,
      expiresIn: '1h',
      algorithm: 'HS256',
    }),
  verify: (token: string) => jwt.verify(token, SECRET),
}
