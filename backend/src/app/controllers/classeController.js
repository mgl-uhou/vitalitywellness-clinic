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
		let variables;
		if(request.params.id){
			let array = Object.values(request.body);
			variables = [parseInt(request.params.id), ...array]
		} else{		
			variables = Object.values(request.body); // Object.values() cria um array com os valores das chaves de um objeto na ordem em que elas estão.
		}
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
		response.json(result.length > 1 ? result : result[0]);
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
		let id, backup;
		if(request.params.valor){
			backup = this.getAtributoId();
			this._atributoId = `${this.getAtributoId()} = ? and ${this.getAtributos()[1]}`
			id = [request.params.id, request.params.valor]
		}else{
			id = [request.params.id];
		}
		const result = await repository.deleteById(
			this.getNomeTabela(),
			this.getAtributoId(),
			id
		);
		if(backup) return this._atributoId = backup;
		response.json(result);
	}
}

export default controller;