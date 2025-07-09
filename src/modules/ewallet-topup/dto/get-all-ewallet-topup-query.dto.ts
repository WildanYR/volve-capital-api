import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllEwalletTopupQueryDto extends BaseGetAllDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ewallet_id?: number;
}
