import pool from './pool.js';

/**
 * 
 * @param {string} sql Consulta que será enviada para o SQL executar.
 * @param {[ array ]} valores Array de valores que será passada para a consulta, caso ela precise disso.
 * @returns Retorna o erro, caso tenha, ou o resultado da consulta.
 */

const connection = async (sql, valores) => {
    try{
        const conn = await pool.getConnection();
        await conn.execute(sql, valores, (error, result) => {
            if (error) throw error;
            return result;
        });
    } catch(error){
        console.error('Erro durante a execução da consulta:', error);
        return error;
    } finally{
        if(conn) conn.release();
    }
};

export default connection;