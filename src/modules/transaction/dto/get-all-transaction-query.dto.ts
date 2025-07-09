import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllTransactionQueryDto extends BaseGetAllDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product_variant_id?: number;
}
