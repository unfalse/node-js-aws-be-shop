import { Controller, Get, Post, Body, Delete, Put, Req } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Post()
  checkout(body: unknown) {
    return this.cartService.checkout(body);
  }

  @Put()
  update(@Body() body: unknown) {
    return this.cartService.update(body);
  }

  @Delete(':id')
  remove(@Req() req: unknown) {
    return this.cartService.remove(req);
  }
}
