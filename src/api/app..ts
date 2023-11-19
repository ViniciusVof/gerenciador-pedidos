import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import errorMiddleware from '../middlewares/error'
import 'express-async-errors'

const app = express()

app.use(express.json()).use(cors()).use(routes).use(errorMiddleware)

export default app
