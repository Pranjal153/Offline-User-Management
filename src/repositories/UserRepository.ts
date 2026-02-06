import { getDB } from '../db/database';
import { ZellerCustomer } from '../types/graphql';

export const UserRepository = {
  async getAll(): Promise<ZellerCustomer[]> {
    const db = await getDB();
    const [res] = await db.executeSql('SELECT * FROM users');
    console.log('22222', res);
    return res.rows.raw();
  },

  async bulkUpsert(users: ZellerCustomer[]) {
    const db = await getDB();
    await db.transaction(tx => {
      users.forEach(u => {
        tx.executeSql(
          `INSERT OR REPLACE INTO users (id, name, email, role)
           VALUES (?, ?, ?, ?)`,
          [u.id, u.name, u.email, u.role],
        );
      });
    });
  },
  async insert(user: ZellerCustomer) {
    const db = await getDB();
    await db.executeSql(
      `INSERT INTO users (id, name, email, role)
       VALUES (?, ?, ?, ?)`,
      [user.id, user.name, user.email, user.role],
    );
  },

  async update(user: ZellerCustomer) {
    const db = await getDB();
    await db.executeSql(
      `UPDATE users
       SET name = ?, email = ?, role = ?
       WHERE id = ?`,
      [user.name, user.email, user.role, user.id],
    );
  },

  async delete(id: string) {
    const db = await getDB();
    await db.executeSql('DELETE FROM users WHERE id = ?', [id]);
  },
};
