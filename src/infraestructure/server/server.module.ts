import { Module } from "@nestjs/common";
import { UsersModule } from "../../domain/users/users.module";
import { ProductModule } from "@/domain/product/product.module";

@Module({
    imports: [UsersModule, ProductModule],
})
export class ServerModule {}
