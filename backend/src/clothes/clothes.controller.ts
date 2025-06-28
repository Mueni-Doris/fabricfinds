import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ClothesService } from './clothes.service';

@Controller('clothes')
export class ClothesController {
  constructor(private clothesService: ClothesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../public/uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadClothe(
    @UploadedFile() image: Express.Multer.File,
    @Body()
    body: {
      name: string;
      description: string;
      price: string;
      stock: string;
      category: string;
    },
  ) {
    const { description, price,  category } = body;

    return this.clothesService.createClothes({
      description,
      price: parseFloat(price),
      image: `/uploads/${image.filename}`,
      category,
    });
  }
}
