import { Module } from '@nestjs/common';
import { BooksProvider } from './services/books';
import { BooksController } from './controllers/books.controller';
import { BookEntity } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksProvider],
})
export class BooksModule {}
