/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma.service';
  import { Like } from '.prisma/client';
  import { CreateLikeDto } from 'src/auth/likes/dto/create-like.dto';
  
  @Injectable()
  export class LikesService {
    constructor(private prismaService: PrismaService) {}
  
    async postlike(data: CreateLikeDto, user: number): Promise<Like> {
      return await this.prismaService.like.create({
        data: {
          ...data,
          userId: user,
        },
      });
    }
  
    async deslike(id: number, user: number): Promise<Like> {
      const userLike = await this.prismaService.like.findUnique({
        where: { id },
        select: {
          userId: true,
        },
      });
  
      if (!userLike) {
        throw new NotFoundException();
      }
  
      if (userLike.userId != user) {
        throw new UnauthorizedException();
      }
  
      return this.prismaService.like.delete({ where: { id } });
    }
  }
  