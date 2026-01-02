import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnvironmentVariablesDTO {
  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_NOTIFICATIONS_SERVICE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_NOTIFICATIONS_SERVICE_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_NOTIFICATIONS_SERVICE_NAME: string;

  @IsString()
  @IsNotEmpty()
  DB_NOTIFICATIONS_SERVICE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DB_NOTIFICATIONS_SERVICE_PORT: number;

  @IsString()
  @IsNotEmpty()
  FRONTEND_ORIGIN: string;

  @IsString()
  @IsNotEmpty()
  BROKER_URL: string;
}
