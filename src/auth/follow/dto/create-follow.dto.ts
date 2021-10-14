/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';

export class CreateFollowDto {
    // @IsOptional()
    // User: number;

    @IsOptional()
    userId: number;

    @IsOptional()
    followedId: number;
}