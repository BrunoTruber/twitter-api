/* eslint-disable prettier/prettier */
import { IsString, Length, IsOptional, IsNumber} from 'class-validator';

export class UpdateTweetDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(1, 140)
  text: string;

  @IsOptional()
  createdAt: string;

  @IsOptional()
  updatedAt: string;
}