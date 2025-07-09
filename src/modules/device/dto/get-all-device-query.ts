import { IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllDevicesQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  name?: string;
}
