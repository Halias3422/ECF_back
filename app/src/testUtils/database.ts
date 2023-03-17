import mysql2 from "mysql2";
import { dbConnexion } from "..";

export const emptyTestDatabase = async () => {
  if (process.env.ENVIRONMENT === "test") {
    const tablesQuery = mysql2.format(
      `SELECT table_name FROM information_schema.tables WHERE TABLE_SCHEMA = (?)`,
      process.env.DB_NAME
    );
    const tables = await dbConnexion.execute(tablesQuery);
    await dbConnexion.execute("SET foreign_key_checks = 0");
    for (const table of tables[0]) {
      for (const key in table) {
        await dbConnexion.execute(`TRUNCATE TABLE ${table[key]}`);
      }
    }
    await dbConnexion.execute("SET foreign_key_checks = 1");
  }
};
