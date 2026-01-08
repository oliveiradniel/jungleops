export interface IConfig {
  PORT: number;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  DB_AUTH_SERVICE_PASSWORD: string;
  DB_AUTH_SERVICE_USER: string;
  DB_AUTH_SERVICE_NAME: string;
  DB_AUTH_SERVICE_HOST: string;
  DB_AUTH_SERVICE_PORT: number;
}
