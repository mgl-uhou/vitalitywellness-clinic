import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool(
    {
        host: process.env.mysql_host || 'localhost',
        user: process.env.mysql_user || 'root',
        password: process.env.mysql_pass || '',
        database: process.env.mysql_db || 'vw_clinic',
        waitForConnections: true, // Indica que a pool deverá esperar finalizar as conexões quando todas estiverem em uso e o limite for atingido. Cria uma fila de conexões, se necessário.
        connectionLimit: 10, // Estabelece o limite de conexões.
        maxIdle: 10, // Número máximo de conexões inativas. Por padrão, é o mesmo número do limite de conexões.
        idleTimeout: 60000, // Tempo limite em que uma conexão pode ficar inative em milissegundos. Após esse tempo, ela é fechada
        queueLimit: 0, // Define o número máximo de conexões que podem ficar na fila de espera. `0` indica que não há limites.
        enableKeepAlive: true, // Indica se o pool deve manter as conexões ativas utilizando keep-alive. `true` indica que será usado. 
        keepAliveInitialDelay: 0 // Tempo em milissegundos para o atraso inicial antes de enviar o primeiro pacote de keep-alive nas conexões. `0` indica que não há atrasos.
    }
);

export default pool;
