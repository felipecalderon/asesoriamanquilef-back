import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './routes';
import dotenv from 'dotenv';
import { initSocket } from './services/socketIO';
import http from 'http'
import { chat } from './controllers/conversation';
dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const io = initSocket(server);

io.on('connection', (socket) => {
	console.log('Un cliente se ha conectado');

	socket.on('chat_query', async (data) => {
		try {
			console.log(data);
			const tempRes = {role: 'assistant', content: 'Ok dejame buscar en mi base de datos, dame un momento porfavor..'}
			const respuestaIA = await chat(data.query, socket);
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
