/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CreateLikeDto } from 'src/auth/likes/dto/create-like.dto';
  import { LikesService } from './likes.service';
  import { Like } from '.prisma/client';
  import { AuthGuard } from '@nestjs/passport';
  import AuthUser from 'src/common/decorators/auth-user.decorator';
  
  @Controller('likes')
  export class LikesController {
    constructor(private likeService: LikesService) {}
  
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Post('create')
    async createLike(@AuthUser()@Body() like: CreateLikeDto, @Req() req): Promise<Like> {
      const user = req.user.id;
      return this.likeService.postlike(like, user);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @Delete('delete/:id')
    async deletelike(@AuthUser()@Param('id', ParseIntPipe) id: number,@Req() req,): Promise<Like> {
      const user = req.user.id;
  
      return this.likeService.deslike(id, user);
    }
  }
  