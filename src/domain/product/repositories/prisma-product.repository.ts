import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infraestructure/database/prisma.service";
import { Product } from "../entities/product";
import { ProductMapper } from "../mappers/product.mapper";

export abstract class ProductRepository {
    abstract findAll(): Promise<Product[]>;
}

@Injectable()
export class PrismaProductRepository implements ProductRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();

        return products.map((product) => ProductMapper.toDomain(product));
    }
}
