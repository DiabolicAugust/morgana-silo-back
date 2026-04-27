import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), S3Module, AuthorizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
