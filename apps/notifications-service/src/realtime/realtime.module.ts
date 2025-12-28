import { Global, Module } from '@nestjs/common';

import { RealTimeGateway } from './realtime.gateway';

@Global()
@Module({
  providers: [RealTimeGateway],
  exports: [RealTimeGateway],
})
export class RealTimeModule {}
