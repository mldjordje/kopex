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
    connectTimeout: 10000,
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
  globalForDb.__kopexDbPool = pool;

  return pool;
};

const transientErrorCodes = new Set([
  'PROTOCOL_CONNECTION_LOST',
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'EPIPE',
  'ER_CON_COUNT_ERROR',
  'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR',
  'PROTOCOL_ENQUEUE_AFTER_QUIT'
]);

const isTransientError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }
  const code = (error as { code?: string }).code;
  return Boolean(code && transientErrorCodes.has(code));
};

const resetPool = async () => {
  if (!globalForDb.__kopexDbPool) {
    return;
  }
  try {
    await globalForDb.__kopexDbPool.end();
  } catch {
    // Best-effort cleanup for broken connections.
  } finally {
    globalForDb.__kopexDbPool = undefined;
  }
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const queryDb = async <T>(
  sql: string,
  params?: unknown[],
  { retries = 2 }: { retries?: number } = {}
): Promise<T> => {
  let attempt = 0;

  while (true) {
    try {
      const [rows] = await getDb().query<T>(sql, params);
      return rows;
    } catch (error) {
      attempt += 1;
      if (!isTransientError(error) || attempt > retries) {
        throw error;
      }
      await resetPool();
      await sleep(150 * attempt);
    }
  }
};
