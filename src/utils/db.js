import mysql from "mysql2/promise";

const pool = mysql.createPool({
  password: "root",
  user: "root",
  host: "localhost",
  database: "shoppa",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 100, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const executeQuery = async (query) => {
  try {
    const [rows, fields] = await pool.query(query);
    return rows;
  } catch (err) {
    const { code, sqlState, sqlMessage } = err;
    throw new Error(`Error code -- ${code}  message -- ${sqlMessage}`);
  }
};
