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
    const sql = `select * from tblProfissionais;`;
    response.json(await repository.getAll(sql));
});

app.post('/profissionais', async (request, response) => {
    /* const {
        pnome_profissional,
        snome_profissional,
        email_profissional,
        senha_profissional,
        cpf_profissional
    } = request.body; */

    const sql = `insert into tblProfissionais (
        pnome_profissional, snome_profissional, email_profissional, senha_profissional, cpf_profissional
    )
    values (?, ?, ?, ?, ?)`

    /* const result = repository.addRow(sql, [
        pnome_profissional,
        snome_profissional,
        email_profissional,
        senha_profissional,
        cpf_profissional
    ]); */
    const result = repository.addRow(sql, Object.values(request.body));
    response.json(result);
});

export default app;
