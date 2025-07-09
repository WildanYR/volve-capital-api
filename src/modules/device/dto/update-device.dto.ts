import { IsString, IsOptional } from 'class-validator';

export class UpdateDeviceDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
