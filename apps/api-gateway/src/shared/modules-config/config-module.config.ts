import { ConfigModuleOptions } from '@nestjs/config';

import { EnvironmentVariablesDTO } from '../config/config.dto';

import { validate } from '@challenge/shared';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  validate: (config) => validate(config, EnvironmentVariablesDTO),
};
