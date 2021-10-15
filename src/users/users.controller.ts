/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Param, UseGuards, UsePipes, ValidationPipe, Delete, ParseIntPipe} from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUsersDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from '../common/decorators/auth-user.decorator';


@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  
  @Post('/create-account')
  create(@Body() data: CreateUsersDto): Promise<User> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findMany(): Promise<User[]> {
    return this.service.findMany()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findUnique(@AuthUser()@Param('id') id: number): Promise<User> {
    return this.service.findUnique(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@AuthUser()@Param('id') id: number) {
    return this.service.deleteOneUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(@AuthUser()@Body() updateUser: CreateUsersDto, @Param('id', ParseIntPipe) id: number,): Promise<User> {
    return this.service.updateOneUser( id, updateUser );
  }
}
