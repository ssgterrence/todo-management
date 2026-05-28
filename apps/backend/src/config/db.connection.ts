import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: process.env["DB_HOST"],
      port: parseInt(process.env["DB_PORT"] || "5432"),
      user: process.env["DB_USER"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_NAME"],
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }
}

export const db = DatabaseConnection.getInstance();
export const query = (text: string, params?: any[]) => db.query(text, params);
