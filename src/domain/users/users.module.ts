import { Module } from "@nestjs/common";
import { PrismaService } from "../../infraestructure/database/prisma.service";
import { UserRepository } from "./repositories/prisma-user.repository";
import { PrismaUserRepository } from "./repositories/prisma-user.repository";
import { UsersService } from "./services/users.service";
import { UserController } from "./controllers/user.controller";
import { CryptographyModule } from "../../infraestructure/cryptography/cryptography.module";

@Module({
    imports: [CryptographyModule],
    controllers: [UserController],
    providers: [
        PrismaService,
        UsersService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
    ],
    exports: [UserRepository, UsersService],
})
export class UsersModule {}
