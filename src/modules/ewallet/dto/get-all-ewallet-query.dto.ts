import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllEwalletQueryDto extends BaseGetAllDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ewallet_type_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  simcard_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  device_id?: number;
}
