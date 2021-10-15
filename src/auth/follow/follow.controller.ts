/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    Delete,
    Param,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    UseGuards,
    Req
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { CreateFollowDto } from 'src/auth/follow/dto/create-follow.dto';
  import { FollowService } from 'src/auth/follow/follow.service';
  import { Follow } from '.prisma/client';
  import AuthUser from 'src/common/decorators/auth-user.decorator';
  
  @Controller('follow')
  export class FollowController {
    constructor(private followService: FollowService) {}
  
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Post('follow')
    async create(@AuthUser()@Body() data: CreateFollowDto, @Req() req): Promise<Follow> {
      const user = req.user.id;
      return this.followService.follow(data, user);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Delete('delete/:id')
    async deletefollow(@AuthUser()@Param('id', ParseIntPipe) id: number, @Req() req,): Promise<Follow> {
      const followId = req.user.id;
      return this.followService.deletefollow(id, followId);
    }
  }
  