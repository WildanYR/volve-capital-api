import { IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllPlatformQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  name?: string;
}
