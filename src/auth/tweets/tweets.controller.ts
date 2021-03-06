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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Tweet } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import { CreateTweetDto } from 'src/auth/tweets/dto/create-tweets.dto';
import { TweetsService } from './tweets.service';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('tweets')
export class TweetsController {
  constructor(private service: TweetsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  find(@AuthUser()@Query('username') username?: string): Promise<Tweet[]> {
    return this.service.find(username);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@AuthUser()@Param('id') id: number): Promise<Tweet> {
    return this.service.findOneTweet(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  post( @Req() req: Request,@AuthUser()@Body() data: CreateTweetDto): Promise<Tweet> {
    return this.service.postTweet(req, data );
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  delete(@AuthUser()@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(
    @AuthUser()
    @Body() updateTweet: CreateTweetDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Tweet>{
    return this.service.update(id,updateTweet);
  }
}