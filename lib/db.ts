import mysql from 'mysql2/promise';

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const createPool = () =>
  mysql.createPool({
    host: requireEnv('DB_HOST'),
    port: Number(process.env.DB_PORT || '3306'),
    user: requireEnv('DB_USER'),
    password: requireEnv('DB_PASSWORD'),
    database: requireEnv('DB_NAME'),
    charset: 'utf8mb4',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });

const globalForDb = globalThis as typeof globalThis & {
  __kopexDbPool?: mysql.Pool;
};

export const getDb = () => {
  if (globalForDb.__kopexDbPool) {
    return globalForDb.__kopexDbPool;
  }

  const pool = createPool();

  if (process.env.NODE_ENV !== 'production') {
    globalForDb.__kopexDbPool = pool;
  }

  return pool;
};
