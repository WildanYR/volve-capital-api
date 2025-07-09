import { IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllEwalletTypeQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  name?: string;
}
