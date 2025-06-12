import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/prisma-product.repository";
import { ProductDTO, ProductSummaryDTO } from "../mappers/product.dtos";
import { ProductMapper } from "../mappers/product.mapper";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    public async getProducts(): Promise<ProductSummaryDTO[]> {
        const products = await this.productRepository.findAll();

        return products.map((product) => ProductMapper.toSummaryDto(product));
    }

    public async getProductById(id: number): Promise<ProductDTO> {
        if (!id) {
            throw new Error("Product ID must be provided");
        }

        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        return ProductMapper.toProductDto(product);
    }
}
