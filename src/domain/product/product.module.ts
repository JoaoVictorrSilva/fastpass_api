import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
import { PrismaService } from "@/infraestructure/database/prisma.service";
import { PrismaProductRepository, ProductRepository } from "./repositories/prisma-product.repository";

@Module({
    controllers: [ProductController],
    providers: [
        PrismaService,
        {
            provide: ProductRepository,
            useClass: PrismaProductRepository,
        },
        ProductService,
    ],
})
export class ProductModule {}
