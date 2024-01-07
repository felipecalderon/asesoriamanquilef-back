import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './routes'
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT || 3001;

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

app.listen(port, async () => {
	return console.log(`Servidor escuchando en el puerto ${port}`);
});
