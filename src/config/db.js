import mysql from "mysql2/promise";

// Configuração do Pool de Conexões
// ** ATENÇÃO: Substitua os valores abaixo pelos seus dados de conexão **
const pool = mysql.createPool({
  host: "localhost:3306", // Seu host (ex: 'localhost', '127.0.0.1')
  user: "root", // Seu usuário do banco de dados
  password: "1234", // Sua senha
  database: "projeto_restaurante", // O nome do seu banco
  waitForConnections: true, // Espera por conexões se o limite for atingido
  connectionLimit: 10, // Número máximo de conexões no pool
  queueLimit: 0, // Sem limite de fila
});

// A função que será usada para executar todas as queries
export async function query(sql, params) {
  // Obtém uma conexão do pool
  const connection = await pool.getConnection();
  try {
    // Executa a query
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    // Libera a conexão de volta para o pool
    connection.release();
  }
}

// Exporta o objeto pool diretamente se precisar de controle mais fino
export default pool;

// Você pode remover o conteúdo do db.js que contém a importação do Lucide e os arrays de produtos
// se quiser que ele seja apenas um arquivo de configuração de banco.
