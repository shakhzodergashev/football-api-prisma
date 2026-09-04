import { IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]+$/)
  surname!: string;

  @IsOptional()
  @IsInt()
  teamId?: number;
}