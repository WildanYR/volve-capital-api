import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllEmailQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  register_device_id?: number;
}
