import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/prisma-product.repository";
import { ProductSummaryDTO } from "../mappers/product.dtos";
import { ProductMapper } from "../mappers/product.mapper";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    public async getProducts(): Promise<ProductSummaryDTO[]> {
        const products = await this.productRepository.findAll();

        return products.map((product) => ProductMapper.toDto(product));
    }
}
