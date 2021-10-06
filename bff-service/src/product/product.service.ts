import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  async create(newProduct: Product) {
    console.log('product: create');
    return await axios.post(this.getUrl(), newProduct);
  }

  getUrl(id?: string) {
    return `${process.env['product']}${id === undefined ? '' : ('/' + id)}`;
  }

  async findAll() {
    console.log('product: findAll');
    const result = await axios.get(this.getUrl());
    return result?.data;
  }

  async findOne(id: string) {
    console.log('product: findOne');
    const result = await axios.get(this.getUrl(id));
    return result?.data;
  }
}
