/* eslint-disable prettier/prettier */
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @Length(1, 140)
  text: string;

  @IsOptional()
  createdAt: string;

  @IsOptional()
  updatedAt: string;
}