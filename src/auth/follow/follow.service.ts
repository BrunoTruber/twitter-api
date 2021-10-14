/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma.service';
  import { CreateFollowDto } from 'src/auth/follow/dto/create-follow.dto';
  import { Follow } from '@prisma/client';
  
  @Injectable()
  export class FollowService {
    constructor(private prismaService: PrismaService) {}
  
    async follow(data: CreateFollowDto, user: number): Promise<Follow> {
      return await this.prismaService.follow.create({
        data: {
          ...data,
          userId: user,
        },
      });
    }
  
    async deletefollow(id: number, userId: number): Promise<Follow> {
      const followed = await this.prismaService.follow.findUnique({
        where: { id },
        select: {
          userId: true,
        },
      });
  
      if (!followed) {
        throw new NotFoundException();
      }
  
      if (followed.userId !== userId) {
        throw new UnauthorizedException();
      }
  
      return this.prismaService.follow.delete({
        where: { id },
      });
    }
  }
  