import { Module } from '@nestjs/common';
import { BooksProvider } from './services/books';
import { BooksController } from './controllers/books.controller';
import { BookEntity } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from '../image/service/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksProvider, ImageUploadService],
})
export class BooksModule {}
