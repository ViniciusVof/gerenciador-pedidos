import { Request, Response, Router } from 'express'

const routes = Router()

routes.get('/hello', (req: Request, res: Response) => {
  const string = req.query.string
  return res.json({
    success: string,
  })
})

export default routes
