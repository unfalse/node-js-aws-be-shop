import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters';

config({
  path: resolve(__dirname, '../.env.eb')
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  console.log('App is listening on port', process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
