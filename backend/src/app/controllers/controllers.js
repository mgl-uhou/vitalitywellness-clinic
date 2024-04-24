"use strict";

import controller from "./classeController.js";

const controllerProfissionais = new controller(
	"tblProfissionais",
	"id_profissional",
	[
		"pnome_profissional",
		"snome_profissional",
		"email_profissional",
		"senha_profissional",
		"cpf_profissional",
	]
);

const controllerEspecsPro = new controller(
	"tblEspecsProfissionais",
	"id_profissional",
	["id_profissional", "especs_profissional"]
);

const controllerServicos = new controller(
	"tblServicos", 
	"id_servico", 
	[ "nome_servico" ]
);

const controllerPrestam = new controller(
	"tblPrestam", 
	"id_profissional", 
	[ "id_profissional", "id_servico" ]
);

const controllerPacientes = new controller("tblPacientes", "id_paciente", [
	"pnome_paciente",
	"snome_paciente",
	"email_paciente",
	"senha_paciente",
	"cpf_paciente",
	"dt_nasc_paciente",
]);

const controllerTelPacientes = new controller(
	"tblTelPacientes",
	"id_paciente",
	[ "id_paciente", "tel_paciente" ]
);

const controllerPagamentosAtende = new controller(
	'tblPagamentosAtende',
	'id_pagamento',
	[
		'status_pagamento',
		'id_paciente',
		'id_profissional',
		'valor_pagamento'
	]
);

const controllerConsultas = new controller(
	'tblConsultas',
	'id_consulta',
	[
		'dt_hr_consulta',
		'status_consulta',
		'obs_consulta',
		'id_paciente'
	]
);

export {
	controllerProfissionais,
	controllerEspecsPro,
	controllerServicos,
	controllerPrestam,
	controllerPacientes,
	controllerTelPacientes,
	controllerPagamentosAtende,
	controllerConsultas
};
