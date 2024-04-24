"use strict";

import repository from "../repositories/repository.js";
import moment from "moment"; // Biblioteca que serve para a formatação de data e hora.

class controller {
	/**
	 *
	 * @param {string} nomeTabela Nome da tabela à qual o objeto referencia
	 * @param {string || Array} atributoId Nome do seu atributo identificador.
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

	formatDateAndHour(element){
		// for que verifica se cada elemento do array tem algum atributo de data e se tiver, formata ele.
		element.forEach(item => {
			if(item.dt_hr_consulta){
				let date = moment(item.dt_hr_consulta).format('DD/MM/YYYY HH:mm');
				item.dt_hr_consulta = date;
			}else if(item.dt_nasc_paciente){
				let date = moment(item.dt_nasc_paciente).format('DD/MM/YYYY');
				item.dt_nasc_paciente = date;
			}
		})
		return element;
	}

	// método que mostra todos os elementos da tabela.
	async index(_request, response) {
		let result = await repository.getAll(this.getNomeTabela());
		response.json(result.length > 1 ? this.formatDateAndHour(result) : this.formatDateAndHour(result)[0]);
	}

	// método que adiciona um elemento à tabela.
	async store(request, response) {
		let variables;
		if(request.params.id){
			let array = Object.values(request.body); // transformo o objeto com os dados em um array.
			variables = [parseInt(request.params.id), ...array] // coloco o id do objeto como o primeiro elemento do array, e desestruturo o array de dados.
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

	// método que mostra elementos com base em seu id
	async show(request, response) {
		const id = request.params.id;
		const result = await repository.getById(
			this.getNomeTabela(),
			this.getAtributoId(),
			id
		);
		// Abaixo, formato de modo simples o resultado da response.
		response.json(result.length > 1 ? this.formatDateAndHour(result) : this.formatDateAndHour(result)[0]);
	}

	// método que atualiza um elemento
	async update(request, response) {
		const id = request.params.id;
		const variables = Object.values(request.body); // Desestruturo o objeto e transformo em um array.
		const result = await repository.updateById(
			this.getNomeTabela(),
			this.getAtributos().join(", "),
			this.getAtributoId(),
			[...variables, id] // aqui o id é passada como último elemento do array.
		); // ...array desestrutura o array dentro de outro array na ordem em que estão.
		response.json(result);
	}
	
	// método que deleta um elemento da tabela.11
	async delete(request, response) {
		const result = await repository.deleteById(
			this.getNomeTabela(),
			this.getAtributoId(),
			[request.params.id]
		);
		response.json(result);
	}

	// método que deleta um elemento baseado em dois valores
	async deleteBy2Values(request, response) {
		const result = await repository.deleteById(
			this.getNomeTabela(),
			this.getAtributos().join(' = ? and '), // Como as tabelas que usam esse método só têm dois atributos, eu uso eles como identificadores na deleção.
			[request.params.id, request.params.value]
		);
		response.json(result);
	}
}

export default controller;