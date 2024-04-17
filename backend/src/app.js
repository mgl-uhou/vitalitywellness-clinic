import express from 'express';
import repository from './app/repositories/repository.js';
import { controllerProfissionais, controllerEspecsPro } from './app/controllers/controller.js';

const app = express();
app.use(express.json()); // Serve para o express ler o body no formato json

app.get('/home', async (_request, response) => {
    response.json(await repository.getAll('tblServicos'));
});

// Se chamar apenas o controllerProfissionais.método o JS não entende o contexto em que o this dentro do método está. Para isso serve o bind, ele define o this no método como controllerProfissionais.

app.get('/profissionais', controllerProfissionais.index.bind(controllerProfissionais)); 
app.post('/profissionais', controllerProfissionais.store.bind(controllerProfissionais));
app.get('/profissionais/:id', controllerProfissionais.show.bind(controllerProfissionais));
app.put('/profissionais/:id', controllerProfissionais.update.bind(controllerProfissionais));
app.delete('/profissionais/:id', controllerProfissionais.delete.bind(controllerProfissionais));

/* 
GET /profissionais/{id_profissional}/especialidades
POST /profissionais/{id_profissional}/especialidades
DELETE /profissionais/{id_profissional}/especialidades/{espec_profissional}
 */

app.get('/profissionais/:id/especialidades', controllerEspecsPro.show.bind(controllerEspecsPro));
app.post('/profissionais/:id/especialidades', controllerEspecsPro.store.bind(controllerEspecsPro));
app.delete('/profissionais/:id/especialidades/:valor', controllerEspecsPro.delete.bind(controllerEspecsPro));
app.delete('/profissionais/:id/especialidades', controllerEspecsPro.delete.bind(controllerEspecsPro));

export default app;
