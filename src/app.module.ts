import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksModule } from './books/books.module';
import { ImageUploadModule } from './image/image.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BooksModule,
    ImageUploadModule,
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
