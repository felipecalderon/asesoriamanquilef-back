import express from 'express'
import rutas from './routes'
import { initSocket } from './services/socketIO'
import http from 'http'
import { socketConnection } from './services/socketConnection'
import { expressMiddlewares } from './middlewares/express'
import { corsMiddlewares } from './middlewares/cors'
import { morganMiddlewares } from './middlewares/morgan'
import { auth0Middlewares } from './middlewares/auth0'
import { port } from './envConfig'

const app = express()

// middlewares
expressMiddlewares(app)
corsMiddlewares(app)
morganMiddlewares(app)
auth0Middlewares(app)

const server = http.createServer(app)
const io = initSocket(server)
io.on('connection', socketConnection)

// base de rutas
app.use('/api', rutas)

server.listen(port, async () => {
  return console.log(`Servidor escuchando en el puerto ${port}`)
})
