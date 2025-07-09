export const AppConfig = () => ({
  app: {
    port: process.env.PORT ? +process.env.PORT : 3000,
    api_prefix: process.env.API_PREFIX || 'api',
    timezone: process.env.TIMEZONE || 'Asia/Jakarta',
    timelocale: process.env.TIMELOCALE || 'ID-id',
  },
});
