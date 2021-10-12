/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';

export class CreateLikeDto {
    @IsNumber()
    Tweet: number;

    @IsNumber()
    tweetId: number;

    @IsNumber()
    User: number;

    @IsNumber()
    userId: number;
}