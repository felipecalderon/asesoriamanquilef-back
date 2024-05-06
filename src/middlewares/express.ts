import express, { Express } from 'express'

export const expressMiddlewares = (app: Express) => {
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    })
  )
}
