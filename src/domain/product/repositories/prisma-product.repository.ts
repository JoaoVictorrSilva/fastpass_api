import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infraestructure/database/prisma.service";
import { Product } from "../entities/product";
import { ProductMapper } from "../mappers/product.mapper";

export abstract class ProductRepository {
    abstract findAll(): Promise<Product[]>;
    abstract findById(id: number): Promise<Product | null>;
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
}
