import pg from 'pg';
const { Client } = pg;

export const pgClient = new Client({
  user: 'johnny',
  password: '',
  host: 'localhost',
  port: '5432',
  database: 'schedule',
  application: 'schedule-API'
});