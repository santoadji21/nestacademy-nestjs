import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { BookDto } from '../dtos/create.book.dto';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { UpdateBookDto } from '../dtos/update.book.dto';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class BooksProvider {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async getBooks(filterBookDto: FilterBookDto): Promise<BookEntity[]> {
    let filter: FindConditions<BookEntity> = {};
    if (filterBookDto.title) {
      filter = { title: filterBookDto.title };
    }
    const books = await this.bookRepository.find(filter);

    return books;
  }

  async findOne(id: number): Promise<BookEntity> {
    return this.bookRepository.findOne(id);
  }

  createBook(bookData: BookDto): Promise<BookEntity> {
    console.log('BookData: /n');
    console.log(bookData);
    const bookEntity = this.bookRepository.create(bookData);
    return this.bookRepository.save(bookEntity);
  }

  async updateBook(id: number, bookData: UpdateBookDto): Promise<BookEntity> {
    await this.bookRepository.update(id, bookData);
    return bookData;
  }

  async deleteBook(id: number): Promise<BookEntity> {
    const book = await this.bookRepository.findOne(id);
    await this.bookRepository.delete(id);
    return book;
  }
}
