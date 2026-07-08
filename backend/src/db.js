import pg from "pg";

const { Pool } = pg;

export const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "globetrotteuses",
  password: "postgres",
  port: 5432
});