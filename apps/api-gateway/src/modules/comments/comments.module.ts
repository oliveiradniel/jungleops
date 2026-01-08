import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';

import { CommentsController } from './comments.controller';

import { CommentsService } from './comments.service';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
