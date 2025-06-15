import { Module } from "@nestjs/common";
import { PrismaService } from "../../infraestructure/database/prisma.service";
import { UserRepository } from "./repositories/prisma-user.repository";
import { PrismaUserRepository } from "./repositories/prisma-user.repository";
import { UsersService } from "./services/users.service";
import { UserController } from "./controllers/user.controller";
import { CryptographyModule } from "../../infraestructure/cryptography/cryptography.module";
import { AuthenticationService } from "./services/authentication.service";
import { AuthenticationController } from "./controllers/authentication.controller";
import { CompanyRepository, PrismaCompanyRepository } from "./repositories/prisma-company.repository";

@Module({
    imports: [CryptographyModule],
    controllers: [UserController, AuthenticationController],
    providers: [
        PrismaService,
        UsersService,
        AuthenticationService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
        {
            provide: CompanyRepository,
            useClass: PrismaCompanyRepository,
        },
    ],
    exports: [UserRepository, UsersService, AuthenticationService],
})
export class UsersModule {}
