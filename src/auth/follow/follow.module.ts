/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FollowController],
  providers: [FollowService, PrismaService]
})
export class FollowModule {}
