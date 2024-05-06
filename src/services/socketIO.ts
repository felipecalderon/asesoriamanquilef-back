import { Server } from 'socket.io'
import http from 'http'

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  return io
}
