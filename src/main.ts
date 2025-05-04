import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/exception.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory(errors) {
      let errorMsg = errors
        .map(err => Object.values(err.constraints || {}).join(', '))  
        .flat()  
        .join(', ')

      throw new BadRequestException(errorMsg);
    }


  }))

  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000
  await app.listen(port, () => {
    console.log(`Server is running at ${port}`);

  });
}
bootstrap();
