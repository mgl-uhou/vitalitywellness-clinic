import express from 'express';
import repository from './app/repositories/repository.js';
import { pool } from './app/database/classePool.js';

const app = express();
app.use(express.json()); // Serve para o express ler o body no formato json

app.get('/home', async (_request, response) => {
    const sql = `select * from tblServicos;`;
    response.json(await repository.getAll(sql));
});

/* 
GET /profissionais
POST /profissionais
GET /profissionais/{id_profissional}
PUT /profissionais/{id_profissional}
DELETE /profissionais/{id_profissional}
*/

app.get('/profissionais', async (_request, response) => {
    response.json(await repository.getAll('tblProfissionais'));
});

app.post('/profissionais', async (request, response) => {
    const variables = Object.values(request.body); // Object.values() cria um array com os valores das chaves de um objeto na ordem em que elas estão.
    const result = await repository.addRow('tblProfissionais', 'pnome_profissional, snome_profissional, email_profissional, senha_profissional, cpf_profissional', variables);
    response.json(result);
});

app.get('/profissionais/:id', async (request, response) => {
    const id = request.params.id;
    const result = await repository.getById('tblProfissionais', 'id_profissional', id);
    response.json(result);
});

app.put('/profissionais/:id', async (request, response) => {
    
});

export default app;
