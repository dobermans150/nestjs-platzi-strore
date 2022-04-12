import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Delete,
  Put,
  Body,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    console.log('ProductsController');
  }

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductsFiler() {
    return 'Yo soy un filtro';
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productsService.createProduct(payload);
  }

  @Put(':id')
  updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, payload);
  }

  @Delete(':id')
  deleteProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
