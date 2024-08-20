import { IsAlpha, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsAlpha() // harus alphabet
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
