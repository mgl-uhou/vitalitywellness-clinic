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
	'tblEspecs_Profissionais',
	'id_profissional',
	['id_profissional', 'especs_profissional']
);

const controllerServicos = new controller(
	'tblServicos',
	'id_servico',
	['nome_servico']
);

const controllerPrestam = new controller(
	'tblPrestam',
	'id_profissional',
	['id_profissional', 'id_servico']
);

export { controllerProfissionais, controllerEspecsPro, controllerServicos, controllerPrestam };
