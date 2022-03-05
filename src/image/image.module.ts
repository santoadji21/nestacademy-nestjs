import { Module } from '@nestjs/common';
import { ImageUploadService } from './service/image.service';
import { ImageUploadController } from './controller/image.controller';
// import { ConfigModule } from '@nestjs/config';

@Module({
  //   imports: [
  //     ConfigModule.forRoot({
  //       isGlobal: true,
  //     }),
  //   ],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
