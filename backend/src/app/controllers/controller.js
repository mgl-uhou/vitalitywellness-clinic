import repository from "../repositories/repository.js";

class controller {
	/**
	 *
	 * @param {string} nomeTabela Nome da tabela à qual o objeto referencia
	 * @param {string} atributoId Nome do seu atributo identificador.
	 * @param {Array} atributos Array contendo o nome de todos os outros atributos como string
	 */
	constructor(nomeTabela, atributoId, atributos) {
		this._nomeTabela = nomeTabela;
		this._atributoId = atributoId;
		this._atributos = atributos;
	}
	getNomeTabela = () => this._nomeTabela;
	getAtributoId = () => this._atributoId;
	getAtributos = () => this._atributos;

	async index(_request, response) {
		response.json(await repository.getAll(this.getNomeTabela()));
	}

	async store(request, response) {
		const variables = Object.values(request.body); // Object.values() cria um array com os valores das chaves de um objeto na ordem em que elas estão.
		const result = await repository.addRow(
			this.getNomeTabela(),
			this.getAtributos().join(", "),
			variables
		);
		response.json(result);
	}

	async show(request, response) {
		const id = request.params.id;
		const result = await repository.getById(
			this.getNomeTabela(),
			this.getAtributoId(),
			id
		);
		response.json(result);
	}

	async update(request, response) {
		const id = request.params.id;
		const variables = Object.values(request.body);
		const result = await repository.updateById(
			this.getNomeTabela(),
			this.getAtributos().join(", "),
			this.getAtributoId(),
			[...variables, id]
		); // ...array desestrutura o array dentro de outro array na ordem em que estão.
		response.json(result);
	}

	async delete(request, response) {
		const id = request.params.id;
		const result = await repository.deleteById(
			this.getNomeTabela(),
			this.getAtributoId(),
			id
		);
		response.json(result);
	}
}

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

export default controllerProfissionais;
