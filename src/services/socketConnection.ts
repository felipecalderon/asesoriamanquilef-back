import { Socket } from "socket.io";
import { chat } from "../controllers/conversation";

export const socketConnection = (socket: Socket) => {
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
}