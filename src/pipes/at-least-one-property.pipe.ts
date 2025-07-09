import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AtLeastOnePropertyPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      typeof value === 'object' &&
      value !== null &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.keys(value).length === 0
    ) {
      throw new BadRequestException(
        'Request body tidak boleh kosong. Setidaknya satu properti harus diisi untuk update.',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}
