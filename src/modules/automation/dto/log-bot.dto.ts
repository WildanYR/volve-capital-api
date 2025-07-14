import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class LogBotDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  @IsNotEmpty()
  @IsString()
  log: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
