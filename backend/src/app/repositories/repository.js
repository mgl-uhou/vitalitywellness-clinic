import { pool } from '../database/classePool.js';

class repository{
	async getAll(sql){
		try{
			const result = await pool.connection(sql); 
			return result;
		}catch(error){
			return console.error('Não foi possível realizar a consulta. Error:', error);
		}
	}
	
	async addRow(sql, values){
		try{
			const result = await pool.connection(sql, values);
			return result;
		}catch(error){
			return console.error('Não foi possível realizar a inserção. Error:', error);
		}
	}
};

export default new repository();