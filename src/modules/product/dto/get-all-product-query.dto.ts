import { IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllProductsQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  name?: string;
}
