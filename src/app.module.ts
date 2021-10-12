import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './auth/follow/follow.module';
import { LikesModule } from './auth/likes/likes.module';
import { TweetsModule } from './auth/tweets/tweets.module';

@Module({
  imports: [UsersModule, AuthModule, FollowModule, LikesModule, TweetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
