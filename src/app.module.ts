import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { EnvModule } from "./infraestructure/env/env.module";
import { envSchema } from "./infraestructure/env/env";
import { GlobalExceptionFilter } from "./infraestructure/errors/global-exception.filter";
import { PrismaModule } from "./infraestructure/database/prisma.module";
import { CryptographyModule } from "./infraestructure/cryptography/cryptography.module";
import { ServerModule } from "./infraestructure/server/server.module";
import { AuthModule } from "./infraestructure/auth/auth.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
            validate: (env) => envSchema.parse(env),
        }),
        EventEmitterModule.forRoot(),
        EnvModule,
        AuthModule,
        PrismaModule,
        CryptographyModule,
        ServerModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}
