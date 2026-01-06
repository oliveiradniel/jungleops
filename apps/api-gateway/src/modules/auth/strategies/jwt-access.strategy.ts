import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { getConfig } from 'src/shared/config/config.helper';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const JWT_ACCESS_SECRET = getConfig(config).JWT_ACCESS_SECRET;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
