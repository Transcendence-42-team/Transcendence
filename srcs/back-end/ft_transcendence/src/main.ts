import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { generateSecretKey } from './utils/auth.utils';


async function bootstrap() {
  config();
  process.env.SECRET_KEY = generateSecretKey().toString('hex');
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    exposedHeaders: 'Content-Disposition',
    maxAge: 86400,
  })
  await app.listen(4000);

}

bootstrap();