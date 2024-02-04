import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './routes';
import dotenv from 'dotenv';
import { initSocket } from './services/socketIO';
import http from 'http'
import { socketConnection } from './services/socketConnection';
dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const io = initSocket(server);

io.on('connection', socketConnection);
app.use(morgan('dev'));
app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(
	cors({
		origin: '*',
	})
);

app.use('/api', rutas);

server.listen(port, async () => {
	return console.log(`Servidor escuchando en el puerto ${port}`);
});
