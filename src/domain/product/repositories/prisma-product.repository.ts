import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infraestructure/database/prisma.service";
import { Product } from "../entities/product";
import { ProductMapper } from "../mappers/product.mapper";
import { Prisma } from "@prisma/client";

export abstract class ProductRepository {
    abstract findAll(): Promise<Product[]>;
    abstract findById(id: number): Promise<Product | null>;
    abstract save(product: Product): Promise<Product>;
}

@Injectable()
export class PrismaProductRepository implements ProductRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();

        return products.map((product) => ProductMapper.toDomain(product));
    }

    async findById(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return null;
        }

        return ProductMapper.toDomain(product);
    }

    async save(product: Product): Promise<Product> {
        const productData = ProductMapper.toPersistence(product);

        const savedProduct = await this.prisma.product.create({
            data: productData as Prisma.productCreateInput,
        });

        return ProductMapper.toDomain(savedProduct);
    }
}
