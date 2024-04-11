import express from 'express';
import connection from './app/database/connection.js';

const app = express();
app.use(express.json()); // Serve para o express ler o body no formato json

app.get('/home', (_request, response) => {
    const sql = `select * from tblServicos;`;
    response.send(connection(sql));
})

export default app;
