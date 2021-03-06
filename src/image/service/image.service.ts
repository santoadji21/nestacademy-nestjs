import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import s3Storage = require('multer-sharp-s3');

const AWS_S3_BUCKET_NAME =
  process.env.AWS_S3_BUCKET_NAME || 'book-image-nestjsbooks21';
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

@Injectable()
export class ImageUploadService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  upload = multer({
    storage: s3Storage({
      s3: s3,
      Bucket: AWS_S3_BUCKET_NAME,
      ACL: 'public-read',
      Key: function (request, file, cb) {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    }),
  }).array('image', 1);

  async fileupload(@Req() req) {
    return new Promise((resolve, reject) => {
      this.upload(req, null, (err) => {
        // console.log(req);
        if (err) {
          reject(err);
        }
        resolve(req.files[0].Location);
      });
    });
  }

  // async fileupload(@Req() req, @Res() res) {
  //   try {
  //     this.upload(req, res, function (error) {
  //       if (error) {
  //         console.log(error);
  //         return res.status(404).json(`Failed to upload image file: ${error}`);
  //       }
  //       // console.log(req);
  //       return res.status(201).json(req.files[0].Location);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json(`Failed to upload image file: ${error}`);
  //   }
  // }
}
