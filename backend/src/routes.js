import { Router } from "express";
import { controllerProfissionais, controllerEspecsPro, controllerServicos, controllerPrestam, controllerPacientes, controllerTelPacientes, controllerPagamentosAtende, controllerConsultas } from './app/controllers/controllers.js';

const router = Router();

// Se chamar apenas o controllerProfissionais.método o JS não entende o contexto em que o this dentro do método está. Para isso serve o bind, ele define o this no método como controllerProfissionais.

// Rotas:
router.get('/profissionais', controllerProfissionais.index.bind(controllerProfissionais)); 
router.post('/profissionais', controllerProfissionais.store.bind(controllerProfissionais));
router.get('/profissionais/:id', controllerProfissionais.show.bind(controllerProfissionais));
router.put('/profissionais/:id', controllerProfissionais.update.bind(controllerProfissionais));
router.delete('/profissionais/:id', controllerProfissionais.delete.bind(controllerProfissionais));

router.get('/profissionais/:id/especialidades', controllerEspecsPro.show.bind(controllerEspecsPro));
router.post('/profissionais/:id/especialidades', controllerEspecsPro.store.bind(controllerEspecsPro));
router.delete('/profissionais/:id/especialidades/:valor', controllerEspecsPro.delete.bind(controllerEspecsPro));
router.delete('/profissionais/:id/especialidades', controllerEspecsPro.delete.bind(controllerEspecsPro));

router.get('/servicos', controllerServicos.index.bind(controllerServicos)); 
router.post('/servicos', controllerServicos.store.bind(controllerServicos));
router.get('/servicos/:id', controllerServicos.show.bind(controllerServicos));
router.put('/servicos/:id', controllerServicos.update.bind(controllerServicos));
router.delete('/servicos/:id', controllerServicos.delete.bind(controllerServicos));

router.get('/profissionais/:id/servicos', controllerPrestam.show.bind(controllerPrestam));
router.post('/profissionais/:id/servicos', controllerPrestam.store.bind(controllerPrestam));
router.delete('/profissionais/:id/servicos/:valor', controllerPrestam.delete.bind(controllerPrestam));
router.delete('/profissionais/:id/servicos', controllerPrestam.delete.bind(controllerPrestam));

router.get('/pacientes', controllerPacientes.index.bind(controllerPacientes)); 
router.post('/pacientes', controllerPacientes.store.bind(controllerPacientes));
router.get('/pacientes/:id', controllerPacientes.show.bind(controllerPacientes));
router.put('/pacientes/:id', controllerPacientes.update.bind(controllerPacientes));
router.delete('/pacientes/:id', controllerPacientes.delete.bind(controllerPacientes));

router.get('/pacientes/:id/telefones', controllerTelPacientes.show.bind(controllerTelPacientes));
router.post('/pacientes/:id/telefones', controllerTelPacientes.store.bind(controllerTelPacientes));
router.delete('/pacientes/:id/telefones/:valor', controllerTelPacientes.delete.bind(controllerTelPacientes));
router.delete('/pacientes/:id/telefones', controllerTelPacientes.delete.bind(controllerTelPacientes));

router.get('/pagamentos', controllerPagamentosAtende.index.bind(controllerPagamentosAtende)); 
router.post('/pagamentos', controllerPagamentosAtende.store.bind(controllerPagamentosAtende));
router.get('/pagamentos/:id', controllerPagamentosAtende.show.bind(controllerPagamentosAtende));
router.put('/pagamentos/:id', controllerPagamentosAtende.update.bind(controllerPagamentosAtende));
router.delete('/pagamentos/:id', controllerPagamentosAtende.delete.bind(controllerPagamentosAtende));

router.get('/consultas', controllerConsultas.index.bind(controllerConsultas)); 
router.post('/consultas', controllerConsultas.store.bind(controllerConsultas));
router.get('/consultas/:id', controllerConsultas.show.bind(controllerConsultas));
router.put('/consultas/:id', controllerConsultas.update.bind(controllerConsultas));
router.delete('/consultas/:id', controllerConsultas.delete.bind(controllerConsultas));

export default router;