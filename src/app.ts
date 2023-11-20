import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { chatRoute } from './routes/chats';

const app = express();
const port = 3001;

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

app.use(chatRoute);

app.listen(port || 3001, async () => {
	return console.log(`Servidor escuchando en el puerto ${port}`);
});