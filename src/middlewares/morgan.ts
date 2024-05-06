import { Express } from 'express'
import morgan from 'morgan'

export const morganMiddlewares = (app: Express) => {
  app.use(morgan('dev'))
}
