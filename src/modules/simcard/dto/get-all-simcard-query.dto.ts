import { IsOptional, IsString } from 'class-validator';
import { BaseGetAllDto } from 'src/validators/get-all-query.dto';

export class GetAllSimcardQueryDto extends BaseGetAllDto {
  @IsOptional()
  @IsString()
  simcard_number?: string;
}
