/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateTweetDto} from './dto/update-tweets.dto';


@Module({
  imports: [TypeOrmModule.forFeature([UpdateTweetDto])],
  providers: [TweetsService, PrismaService],
  controllers: [TweetsController],
})
export class TweetsModule {}