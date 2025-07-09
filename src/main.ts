import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Settings as LuxonSetting } from 'luxon';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { InvalidDataException } from './exceptions/invalid-data.exception';
import { ApiExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  // app.setGlobalPrefix(configService.get('app.prefix')!);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new InvalidDataException(errors),
    }),
  );
  app.useGlobalFilters(new ApiExceptionFilter(httpAdapterHost));

  LuxonSetting.defaultLocale = configService.get<string>('app.timelocale')!;
  LuxonSetting.defaultZone = configService.get<string>('app.timezone')!;

  await app.listen(configService.get<number>('app.port')!);
}

bootstrap();
