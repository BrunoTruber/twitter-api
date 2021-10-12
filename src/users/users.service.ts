/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto} from 'src/users/users.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async findMany(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async findUnique(id: number): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const existing = await this.db.user.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const user = await this.db.user.create({
      data: {
        ...data,
        senha: hashedPassword,
      },
    });

    return user;
  }

  async updateOneUser(id: number, user: CreateUsersDto): Promise<User> {
    return await this.db.user.update({
      data: {
        ...user,
        id: undefined,
      },
      where: {
        id,
      }
    });
  }

  async deleteOneUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.db.user.delete({ where });
  }
}
