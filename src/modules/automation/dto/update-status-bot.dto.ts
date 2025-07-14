import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusBotDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}
