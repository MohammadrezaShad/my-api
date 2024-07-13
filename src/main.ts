import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';

import { JobsService } from '@/modules/jobs/jobs.service';

import { AppModule } from './app.module';
import { winstonConfig } from './winston.config';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const cookieSecret = process.env.COOKIE_SECRET;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const jobsService = app.get(JobsService);
  await jobsService.scheduleJobs();
  const allowedOrigins = ['http://localhost:3000'];
  app.use('/graphql', graphqlUploadExpress());

  const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({}));
  app.use(cookieParser(cookieSecret));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
