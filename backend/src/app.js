import express from 'express';
import router from './routes.js';

const app = express();
app.use(express.json()); // Serve para o express ler o body no formato json
app.use(router);

export default app;
