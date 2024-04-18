import express from 'express';
import { controllerProfissionais, controllerEspecsPro, controllerServicos, controllerPrestam } from './app/controllers/controllers.js';

const app = express();
app.use(express.json()); // Serve para o express ler o body no formato json

// Se chamar apenas o controllerProfissionais.método o JS não entende o contexto em que o this dentro do método está. Para isso serve o bind, ele define o this no método como controllerProfissionais.

app.get('/profissionais', controllerProfissionais.index.bind(controllerProfissionais)); 
app.post('/profissionais', controllerProfissionais.store.bind(controllerProfissionais));
app.get('/profissionais/:id', controllerProfissionais.show.bind(controllerProfissionais));
app.put('/profissionais/:id', controllerProfissionais.update.bind(controllerProfissionais));
app.delete('/profissionais/:id', controllerProfissionais.delete.bind(controllerProfissionais));

app.get('/profissionais/:id/especialidades', controllerEspecsPro.show.bind(controllerEspecsPro));
app.post('/profissionais/:id/especialidades', controllerEspecsPro.store.bind(controllerEspecsPro));
app.delete('/profissionais/:id/especialidades/:valor', controllerEspecsPro.delete.bind(controllerEspecsPro));
app.delete('/profissionais/:id/especialidades', controllerEspecsPro.delete.bind(controllerEspecsPro));

app.get('/servicos', controllerServicos.index.bind(controllerServicos)); 
app.post('/servicos', controllerServicos.store.bind(controllerServicos));
app.get('/servicos/:id', controllerServicos.show.bind(controllerServicos));
app.put('/servicos/:id', controllerServicos.update.bind(controllerServicos));
app.delete('/servicos/:id', controllerServicos.delete.bind(controllerServicos));

app.get('/profissionais/:id/servicos', controllerPrestam.show.bind(controllerPrestam));
app.post('/profissionais/:id/servicos', controllerPrestam.store.bind(controllerPrestam));
app.delete('/profissionais/:id/servicos/:valor', controllerPrestam.delete.bind(controllerPrestam));
app.delete('/profissionais/:id/servicos', controllerPrestam.delete.bind(controllerPrestam));

/*
GET /pacientes
POST /pacientes
GET /pacientes/{id_paciente}
PUT /pacientes/{id_paciente}
DELETE /pacientes/{id_paciente}
*/

export default app;
