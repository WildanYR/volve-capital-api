import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllPlatformProductQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  platform_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product_id?: number;
}
