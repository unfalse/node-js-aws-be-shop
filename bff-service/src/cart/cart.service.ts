import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CartService {

  async checkout(body: unknown) {
    const result = await axios.post(this.getUrl(), body);
    return result?.data;
  }

  async findAll() {
    const result = await axios.get(this.getUrl());
    return result?.data;
  }

  async update(body: unknown) {
    const result = await axios.put(this.getUrl(), body);
    return result?.data;
  }

  async remove(req: unknown) {
    const result = await axios.delete(this.getUrl(), req);
    return result?.data;
  }

  getUrl() {
    return `${process.env['cart']}`;
  }
}
