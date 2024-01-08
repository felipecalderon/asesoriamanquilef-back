import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './routes';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { chat } from './controllers/conversation';
dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	console.log('Un cliente se ha conectado');

	socket.on('chat_query', async (data) => {
		try {
			const respuestaIA = await chat(data.query);
			socket.emit('chat_response', respuestaIA);
		} catch (error) {
			socket.emit('chat_error', error);
		}
	});

	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
	});
});
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
