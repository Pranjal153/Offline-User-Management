import { getDB } from './database';

export const createUserTable = async () => {
  const db = await getDB();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT,
      role TEXT
    );
  `);
};
