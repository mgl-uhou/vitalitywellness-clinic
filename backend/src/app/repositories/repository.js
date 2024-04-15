import { pool } from '../database/classePool.js';

class repository{
	consoleError(error){
		return console.error('Não foi possível realizar a consulta. Error:', error);
	};

	async getAll(nomeTabela){
		const sql = `select * from ${nomeTabela};`;
		try{
			const result = await pool.connection(sql, [], 'Não foi possível mostrar os resultados solicitados.'); 
			return result;
		}catch(error){
			this.consoleError(error);
			return error.message;
		}
	}
	
	/**
	 * 
	 * @param {string} nomeTabela Nome da tabela que será usada para a inserção de dados.
	 * @param {string} nomeAtributos Nome dos atributos separados por vírgula.
	 * @param {array} values Array de valores para as propriedades.
	 * @returns Retorna o resultado da inserção.
	 */
	async addRow(nomeTabela, nomeAtributos, values){
		const arrayNomes = nomeAtributos.split(',');
		const interrogacoes = arrayNomes.map(() => '?').join(', ');
		const sql = `insert into ${nomeTabela} (${nomeAtributos}) values (${interrogacoes})`;
		try{
			const result = await pool.connection(sql, values, 'Não foi possível fazer a inserção dos dados. Verifique-os e garanta que estão todos preenchidos corretamente.');
			return result;
		}catch(error){
			this.consoleError(error);
			return error.message;
		}
	}

	/**
	 * 
	 * @param {string} nomeTabela Nome da tabela.
	 * @param {string} atributoId Nome do atributo identificador da tabela.
	 * @param {number} id Valor do id do elemento.
	 * @returns Retorna em JSON o elemento procurado, nada ou uma mensagem de erro.
	 */
	async getById(nomeTabela, atributoId, id) {
		const sql = `select * from ${nomeTabela} where ${atributoId} = ?;`;
		try{
			const result = await pool.connection(sql, [id], 'Não foi possível encontrar o que foi solicitado. Certifique-se de ser algo existente na base de dados.'); 
			return result;
		}catch(error){
			this.consoleError(error);
			return error.message;
		}
	}

	/**
	 * 
	 * @param {string} nomeTabela Nome da tabela.
	 * @param {string} propriedades Nome das propriedades da tabela separados por vírgula..
	 * @param {string} atributoId Nome do atributo identificador da tabela. 
	 * @param {array} valores Array de valores à serem passados na query 
	 * @returns Retorna o resultado da consulta.
	 */
	async updateById(nomeTabela, propriedades, atributoId, valores, id){
		const propriedadeValor = propriedades.split(',').map(p => `${p} = ?`).join(', ')
		const sql = `update ${nomeTabela} set ${propriedadeValor} = ? where ${atributoId} = ?;`;
		try{
			const result = await pool.connection(sql, [...valores, id], 'Não foi possível atualizar. Certifique-se de usar os valores corretor e de que o elemento existe na base de dados.'); 
			return result;
		}catch(error){
			this.consoleError(error);
			return error.message;
		}
	}
};

export default new repository();