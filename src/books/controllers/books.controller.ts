import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksProvider } from '../services/books';
import { BookEntity } from '../entities/book.entity';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BookDto } from '../dtos/create.book.dto';
import { UpdateBookDto } from '../dtos/update.book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksProvider) {}

  @Get()
  public async getBooks(
    @Query() filterBookDto: FilterBookDto,
  ): Promise<BookEntity[]> {
    return this.bookService.getBooks(filterBookDto);
  }

  @Get(':id')
  getOneBook(@Param() params): Promise<BookEntity> {
    return this.bookService.findOne(params.id);
  }

  @Post()
  async createBook(@Body() bodyData: BookDto): Promise<BookEntity> {
    return this.bookService.createBook(bodyData);
  }

  @Put(':id')
  async updateBook(
    @Body() bodyData: UpdateBookDto,
    @Param() params,
  ): Promise<BookEntity> {
    return this.bookService.updateBook(params.id, bodyData);
  }

  @Delete(':id')
  async deleteBook(@Param() params): Promise<BookEntity> {
    return this.bookService.deleteBook(params.id);
  }
}
