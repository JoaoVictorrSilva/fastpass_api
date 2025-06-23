import { Module } from "@nestjs/common";
import { UsersModule } from "../../domain/users/users.module";
import { ProductModule } from "@/domain/product/product.module";
import { FinancialModule } from "@/domain/financial/financial.module";

@Module({
    imports: [UsersModule, ProductModule, FinancialModule],
})
export class ServerModule {}
