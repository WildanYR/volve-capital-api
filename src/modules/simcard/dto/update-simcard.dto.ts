import { IsString, IsOptional } from 'class-validator';

export class UpdateSimcardDto {
  @IsOptional()
  @IsString()
  simcard_number: string;

  @IsOptional()
  @IsString()
  location: string;
}
