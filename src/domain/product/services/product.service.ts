import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/prisma-product.repository";
import { ProductCreateDTO, ProductDTO, ProductSummaryDTO } from "../mappers/product.dtos";
import { ProductMapper } from "../mappers/product.mapper";
import { Product } from "../entities/product";

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

    public async createProduct(productDto: ProductCreateDTO, userId: number): Promise<ProductDTO> {
        if (!productDto || !productDto.name || !productDto.value) {
            throw new Error("Product name and price must be provided");
        }

        const product = new Product({
            name: productDto.name,
            description: productDto.description,
            category: productDto.category,
            value: productDto.value,
            user_id: userId,
            created_at: new Date(),
        });

        const productSaved = await this.productRepository.save(product);

        return ProductMapper.toProductDto(productSaved);
    }
}
