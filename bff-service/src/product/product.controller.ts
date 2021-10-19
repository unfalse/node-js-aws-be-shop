import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() newProduct: Product) {
    return this.productService.create(newProduct);
  }

  @Get()
  findOneOrAll(@Query('id') id: string) {
    console.log(id);

    return typeof(id) === 'undefined'
      ? this.productService.findAll()
      : this.productService.findOne(id);
  }
}
