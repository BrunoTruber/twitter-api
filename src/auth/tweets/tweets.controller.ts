/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Tweet, Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
//import AuthUser from '../common/decorators/auth-user.decorator';
import { CreateTweetDto } from 'src/auth/tweets/dto/create-tweets.dto';
import { TweetsService } from './tweets.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tweets')
export class TweetsController {
  constructor(private service: TweetsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  find(@Query('username') username?: string): Promise<Tweet[]> {
    return this.service.find(username);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: number): Promise<Tweet> {
    return this.service.findOneTweet(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  post(@Body() data: Prisma.TweetCreateInput): Promise<Tweet> {
    return this.service.post(data);
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  delete(@Param('id') id: number): Promise<void> {
    return this.service.delete( id);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateTweet: CreateTweetDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Tweet>{
    return this.service.update(id, updateTweet);
  }
}