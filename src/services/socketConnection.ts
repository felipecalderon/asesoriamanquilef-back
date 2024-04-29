import { Socket } from "socket.io";
import { chat } from "../controllers/conversation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const socketConnection = (socket: Socket) => {
	console.log('Un cliente se ha conectado');

	socket.on('chat_query', async (data: ChatCompletionMessageParam[]) => {
		try {
			const respuestaIA = await chat(data);
			socket.emit('chat_response', respuestaIA);
		} catch (error) {
			socket.emit('chat_error', error);
		}
	});

	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
	});
}