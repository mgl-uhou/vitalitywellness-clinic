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

	async connection(sql, valores) {
		try {
			const conn = await pool.getConnection();
			await conn.execute(sql, valores, (error, result) => {
				if (error) throw error;
				return result;
			});
		} catch (error) {
			console.error("Erro durante a execução da consulta:", error);
			return error;
		} finally {
			if (conn) conn.release();
		};
	};
};

const pool = new Pool();

export { Pool, pool};
