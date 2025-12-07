import { Global, Module } from '@nestjs/common';

import { NotificationsGateway } from './notifications.gateway';
import { TaskAuditLogGateway } from './task-audit-log.gateway';

@Global()
@Module({
  providers: [NotificationsGateway, TaskAuditLogGateway],
  exports: [NotificationsGateway, TaskAuditLogGateway],
})
export class GatewayModule {}
