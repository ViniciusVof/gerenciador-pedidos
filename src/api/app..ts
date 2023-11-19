import express from 'express'
import cors from 'cors'
import routes from './routes'
import errorMiddleware from '../middlewares/error'

const app = express()

app.use(express.json()).use(cors()).use(routes).use(errorMiddleware)

export default app
