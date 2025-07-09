import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllProductAccountQueryDto extends BaseGetAllDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  email_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product_id?: number;
}
