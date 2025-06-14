import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";
import { PrismaService } from "@/infraestructure/database/prisma.service";
import { PrismaProductRepository, ProductRepository } from "./repositories/prisma-product.repository";
import { TicketsGateway } from "./gateways/tickets.gateway";
import { PrismaTicketRepository, TicketRepository } from "./repositories/prisma-ticket.repository";
import { TicketsController } from "./controllers/tickets.controller";
import { TicketsService } from "./services/tickets.service";
import { CryptographyModule } from "@/infraestructure/cryptography/cryptography.module";

@Module({
    imports: [CryptographyModule],
    controllers: [ProductController, TicketsController],
    providers: [
        PrismaService,
        {
            provide: ProductRepository,
            useClass: PrismaProductRepository,
        },
        {
            provide: TicketRepository,
            useClass: PrismaTicketRepository,
        },
        TicketsService,
        ProductService,
        TicketsGateway,
    ],
})
export class ProductModule {}
