/* eslint-disable prettier/prettier */
import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class CreateTweetDto {

  @IsString()
  @Length(1, 140)
  text: string;

  @IsOptional()
  createdAt: string;

  @IsOptional()
  updatedAt: string;

  @IsOptional()
  @IsNumber()
  userId: number[];
}