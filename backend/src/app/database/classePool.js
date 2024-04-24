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
		this._pool = mysql2.createPool({
			host,
			user,
			password,
			waitForConnections,
			connectionLimit,
			maxIdle,
			idleTimeout,
			queueLimit,
			enableKeepAlive,
			keepAliveInitialDelay,
		});

	this.createDataBaseIfNotExists(database);	
	}

	async createDataBaseIfNotExists(database){
		let conn;
		try{
			conn = await this.getPool().promise().getConnection();
			if(!conn) throw new Error("Não foi possível estabelecer a conexão.")

			await conn.query(
				`create database if not exists ${database}
				default character set utf8mb4
				default collate utf8mb4_unicode_ci;`
			); // Cria a base de dados.
			await conn.query(`use ${database};`); // Usa a base de dados.
		}catch(error){
			console.error(error.message);
			return error;
		}finally{
			if(conn) conn.release();
		}

		this.createTablesIfNotExists();
	}

	async createTablesIfNotExists(){
		try{
			await this.connection(
				`create table if not exists tblProfissionais(
					id_profissional int primary key auto_increment,
					pnome_profissional varchar(25) not null,
					snome_profissional varchar(50) not null,
					email_profissional varchar(100) not null,
					senha_profissional varchar(16) not null check(char_length(senha_profissional) > 8),
					cpf_profissional varchar(11) not null unique
				);`,
				[],
				"Não foi possível criar a tabela tblProfissionais."
			);
	
			await this.connection(
				`create table if not exists tblEspecsProfissionais(
					id_profissional int,
					especs_profissional varchar(15) check(especs_profissional in ('Fisioterapia', 'Psicologia', 'Nutrição', 'Clínico Geral')),
					foreign key (id_profissional) references tblProfissionais(id_profissional),
					primary key (id_profissional, especs_profissional) 
				);`,
				[],
				"Não foi possível criar a tabela tblEspecsProfissionais."
			);
	
			await this.connection(
				`create table if not exists tblServicos(
					id_servico int primary key auto_increment,
					nome_servico varchar(25) not null
				);`,
				[],
				"Não foi possível criar a tabela tblServicos."
			);
	
			await this.connection(
				`create table if not exists tblPrestam(
					id_profissional int,
					id_servico int,
					foreign key (id_profissional) references tblProfissionais(id_profissional),
					foreign key (id_servico) references tblServicos(id_servico),
					primary key (id_profissional, id_servico)
				);`,
				[],
				"Não foi possível criar a tabela tblPrestam."
			);
	
			await this.connection(
				`create table if not exists tblPacientes(
					id_paciente int primary key auto_increment,
					pnome_paciente varchar(25) not null,
					snome_paciente varchar(50) not null, 
					email_paciente varchar(100) not null,
					senha_paciente varchar(16) not null check(char_length(senha_paciente) > 8),
					cpf_paciente varchar(11) not null unique,
					dt_nasc_paciente date
				);`,
				[],
				"Não foi possível criar a tabela tblPacientes"
			);
	
			await this.connection(
				`create table if not exists tblTelPacientes(
					id_paciente int,
					tel_paciente varchar(20),
					foreign key (id_paciente) references tblPacientes(id_paciente),
					primary key (id_paciente, tel_paciente)
				);`,
				[],
				"Não foi possível criar a tabela tblTelPacientes"
			);
	
			await this.connection(
				`create table if not exists tblPagamentosAtende(
					id_pagamento int primary key auto_increment,
					status_pagamento varchar(10) check(status_pagamento in ('Pago', 'Pendente')),
					id_paciente int,
					id_profissional int,
					valor_pagamento float not null,
					foreign key (id_paciente) references tblPacientes(id_paciente),
					foreign key (id_profissional) references tblProfissionais(id_profissionais)
				);`,
				[],
				"Não foi possível criar a tabela tblPagamentosAtende"
			);
	
			await this.connection(
				`create table if not exists tblConsultas(
					id_conculta int primary key auto_increment,
					dt_hr_consulta datetime,
					status_consulta varchar(10) check(status_consulta in ('Pendente', 'Concluído')) not null,
					obs_consulta varchar(500),
					id_paciente int,
					foreign key (id_paciente) references tblPacientes(id_paciente)
				);`,
				[],
				"Não foi possível criar a tabela tblConsultas"
			);
		}catch(error){
			console.error('Erro durante a criação das tabelas:', error);
			throw new Error('Não foi possível criar as tabelas.')
		}
	}

	getPool = () => this._pool;

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
			conn = await this.getPool().promise().getConnection();
			if (!conn)
				throw new Error("Não foi possível estabelecer uma conexão.");

			const [rows, _fields] = await conn.execute(sql, valores);
			return rows;
		} catch (error) {
			console.error("Erro durante a execução da consulta:", error);
			throw new Error(errorMessage);
		} finally {
			if(conn) conn.release();
		}
	}
}

const pool = new Pool();

export { Pool, pool };
