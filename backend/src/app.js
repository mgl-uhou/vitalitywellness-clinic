"use strict";

import express from 'express';
import router from './routes.js';

const app = express(); // Crio uma instância do Express
app.use(express.json()); // Serve para o Express ler o body no formato json
app.use(router); // Define que o aplicativo vai usar as rotas definidas no arquivo routes.js

export default app;
