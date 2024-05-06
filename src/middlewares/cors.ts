import { Express } from 'express'
import cors from 'cors'

export const corsMiddlewares = (app: Express) => {
  app.use(
    cors({
      origin: '*',
    })
  )
}
