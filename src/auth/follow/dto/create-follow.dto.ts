/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';

export class CreateFollowDto {
    @IsNumber()
    User: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    followedId: number;
}