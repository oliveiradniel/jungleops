import { IsNotEmpty, IsNumber, IsString, NotEquals } from 'class-validator';

export class EnvironmentVariablesDTO {
  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  DB_AUTH_SERVICE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_AUTH_SERVICE_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_AUTH_SERVICE_NAME: string;

  @IsString()
  @IsNotEmpty()
  DB_AUTH_SERVICE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DB_AUTH_SERVICE_PORT: number;
}
