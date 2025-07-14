import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class BotTransactionItemDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  qty: number;
}

export class BotTransactionDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @ValidateNested({ each: true })
  @Type(() => BotTransactionItemDto)
  items: BotTransactionItemDto[];

  @IsOptional()
  @IsString()
  order_id: string;
}
