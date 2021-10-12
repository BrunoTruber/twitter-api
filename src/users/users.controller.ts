/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Param, UseGuards, UsePipes, ValidationPipe, Delete, ParseIntPipe} from '@nestjs/common';
import { User, Prisma } from '.prisma/client';
import { CreateUsersDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  
  @Post('/create-account')
  create(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findMany(): Promise<User[]> {
    return this.service.findMany()
  }

  @Get(':id')
  findUnique(@Param('id') id: number): Promise<User> {
    return this.service.findUnique(id);
  }


  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id') id: number) {
    return this.service.deleteOneUser({ id: Number(id) });
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(@Body() updateUser: CreateUsersDto, @Param('id', ParseIntPipe) id: number,): Promise<User> {
    return this.service.updateOneUser( id, updateUser );
  }
}
