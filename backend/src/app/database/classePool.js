"use strict";

import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

class Pool {
	constructor(
		host = process.env.mysql_host,
		user = process.env.mysql_user,
		password = process.env.mysql_pass,
		database = process.env.mysql_db,
		waitForConnections = true,
		connectionLimit = 10,
		maxIdle = 10,
		idleTimeout = 60000,
		queueLimit = 0,
		enableKeepAlive = true,
		keepAliveInitialDelay = 0
	) {
		this.pool = mysql2.createPool({
			host,
			user,
			password,
			database,
			waitForConnections,
			connectionLimit,
			maxIdle,
			idleTimeout,
			queueLimit,
			enableKeepAlive,
			keepAliveInitialDelay,
		});
	}
	
	/**
	 * 
	 * @param {string} sql Consulta que será enviada para o SQL executar.
	 * @param {array} valores Array de valores que será passada para a consulta, caso ela precise disso.
	 * @param {string} errorMessage Mensagem de erro para caso a consulta dê errado.
	 * @returns Retorna o erro, caso tenha, ou o resultado da consulta.
	 */
	async connection(sql, valores, errorMessage) {
		let conn;
		try {
			conn = await this.pool.promise().getConnection();
			if(!conn) throw new Error('Não foi possível estabelecer uma conexão.')
			
			const [ rows, _fields ] = await conn.execute(sql, valores);
			return rows;
		} catch (error) {
			console.error("Erro durante a execução da consulta:", error);
			throw new Error(errorMessage);
		} finally {
			if (conn) conn.release();
		};
	};
};

const pool = new Pool();

export { Pool, pool};
