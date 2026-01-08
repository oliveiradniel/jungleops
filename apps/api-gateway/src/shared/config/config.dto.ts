import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value: port }: { value: string }) => {
    return port ? Number(port) : 3001;
  })
  PORT: number;

  @IsString()
  @IsNotEmpty()
  FRONTEND_ORIGIN: string;

  @IsString()
  @IsNotEmpty()
  AUTH_SERVICE_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  TASK_AUDIT_LOGS_SERVICE_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  USERS_SERVICE_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  TASKS_SERVICE_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  USERS_TASKS_SERVICE_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  NOTIFICATIONS_SERVICE_BASE_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  BROKER_URL: string;

  @IsIn(['development', 'production', 'test'])
  @IsNotEmpty()
  NODE_ENV: 'development' | 'production' | 'test';
}
