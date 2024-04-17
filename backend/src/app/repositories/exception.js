/**
 * 
 * @param {object} pool A pool que fará a conexão.
 * @param {string} sql Instrução sql.
 * @param {array} values Array de valores á ser passado para a pool.
 * @param {string} errorMessage Mensagem de erro à ser passada para a pool.
 * @returns 
 */
export const exception = async (pool, sql, values = [], errorMessage) => {
	try {
		const result = await pool.connection(
			sql,
			values,
			errorMessage
		);
		return result;
	} catch (error) {
		this.consoleError(error);
		return error.message;
	}
};
