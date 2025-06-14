import { Module } from "@nestjs/common";
import { PrismaService } from "@/infraestructure/database/prisma.service";
import { ExtractService } from "./services/extract.service";
import { ExtractRepository, PrismaExtractRepository } from "./repositories/prisma-extract.repository";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [],
    providers: [
        PrismaService,
        {
            provide: ExtractRepository,
            useClass: PrismaExtractRepository,
        },
        ExtractService,
    ],
})
export class FinancialModule {}
