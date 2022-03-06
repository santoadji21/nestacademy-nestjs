import { Controller, Post, Req, Res } from '@nestjs/common';
import { ImageUploadService } from '../service/image.service';

@Controller('fileupload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}
  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.imageUploadService.fileupload(request);
      return response.status(201).json(request.files[0].Location);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
