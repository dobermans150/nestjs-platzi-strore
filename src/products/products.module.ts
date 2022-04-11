import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { BrandController } from './controllers/brand.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsController } from './controllers/products.controller';

import { BrandService } from './services/brand.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';

import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [
    BrandController,
    CategoriesController,
    ProductsController,
    OrdersController,
  ],
  providers: [BrandService, CategoriesService, ProductsService, OrdersService],
  exports: [ProductsService],
})
export class ProductsModule {}
