import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-jwt';

import { getConfig } from 'src/shared/config/config.helper';
import { cookieExtractor } from 'src/shared/utils/cookie-extractor';

import { JWT_REFRESH_STRATEGY_NAME } from 'src/shared/constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_STRATEGY_NAME,
) {
  constructor(config: ConfigService) {
    const JWT_REFRESH_SECRET = getConfig(config).JWT_REFRESH_SECRET;

    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
