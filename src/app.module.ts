import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import * as Joi from 'joi';
import * as path from 'path';

import { JobsModule } from '@/modules/jobs/jobs.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${
        process.env.NODE_ENV === 'dev'
          ? process.cwd()
          : path.join(process.cwd(), '..')
      }/config/.env.${process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'}`,
      isGlobal: true,
      validationSchema: Joi.object({}),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          fieldResolverEnhancers: ['guards'],
          uploads: false,
          autoSchemaFile: true,
          context: ctx => ctx,
          sortSchema: true,
          transformSchema: schema => {
            const sc = schema;
            return sc;
          },
          subscriptions: {
            'graphql-ws': true,
          },
          playground: true,
          plugins: [],
          cors: {
            credentials: true,
            // eslint-disable-next-line @typescript-eslint/ban-types
            origin: function (origin: string, callback: Function) {
              const ALLOWED_SITES = process.env.ALLOWED_SITES?.split(
                ',',
              ) as string[];
              if (
                !origin ||
                ALLOWED_SITES.includes('*') ||
                ALLOWED_SITES.indexOf(origin) !== -1
              ) {
                callback(null, true);
              } else {
                callback(new Error('Not allowed by CQRS'));
              }
            },
          },
        };
      },
      inject: [],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    CacheModule.registerAsync<any>({
      isGlobal: true,
      useFactory: (config: ConfigService) => {
        const host = config.get('REDIS_HOST');
        const port = config.get('REDIS_PORT');
        const ttl = config.get('CACHE_TTL');

        return {
          store: redisStore,
          host,
          port,
          ttl,
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    JobsModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
