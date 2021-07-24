import { mockProducts } from '../../mocks/products';

export class ProductsService {
    getProductsList = async () => await Promise.resolve(mockProducts);

    getProductById = async (id: string) => await Promise.resolve(mockProducts.find(p => p.id === id));
}
