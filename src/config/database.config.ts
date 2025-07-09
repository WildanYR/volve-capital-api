export const DatabaseConfig = () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_DB || 'volve_capital',
  },
});
