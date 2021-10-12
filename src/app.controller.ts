/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SimpleGuard } from './auth/simple.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(SimpleGuard)
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}