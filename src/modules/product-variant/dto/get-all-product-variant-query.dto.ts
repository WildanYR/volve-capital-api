import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllProductVariantQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product_id?: number;
}
