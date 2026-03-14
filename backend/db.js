import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'configurator',
  password: 'your_pg_password',
  port: 5432,
});

export default pool;
