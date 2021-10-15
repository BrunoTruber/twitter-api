/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';

export class CreateLikeDto {

    @IsNumber()
    tweetId: number;

    @IsNumber()
    userId: number;
}