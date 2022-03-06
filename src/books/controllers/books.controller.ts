import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BooksProvider } from '../services/books';
import { BookEntity } from '../entities/book.entity';
import { FilterBookDto } from '../dtos/filter.book.dto';
import { BookDto } from '../dtos/create.book.dto';
import { UpdateBookDto } from '../dtos/update.book.dto';
import { ImageUploadService } from '../../image/service/image.service';
import { response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(
    private bookService: BooksProvider,
    private imageUploadService: ImageUploadService,
  ) {}

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

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createBook(
    @Body() bodyData: BookDto,
    @Req() request,
    @Res() response,
    @UploadedFiles() multifiles,
  ): Promise<BookEntity> {
    try {
      await this.imageUploadService.fileupload(request);
      bodyData.image = request.files[0].Location;
      return this.bookService.createBook(bodyData);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
    // await this.imageUploadService.fileupload(request);
    // console.log(files);
    // console.log(body);
    // console.log(request.files[0].Location);
    // body.image = request.files[0].Location;
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
