import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { EnvModule } from "./infraestructure/env/env.module";
import { envSchema } from "./infraestructure/env/env";
import { GlobalExceptionFilter } from "./infraestructure/errors/global-exception.filter";
import { PrismaModule } from "./infraestructure/database/prisma.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
            validate: (env) => envSchema.parse(env),
        }),
        EnvModule,
        PrismaModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}
