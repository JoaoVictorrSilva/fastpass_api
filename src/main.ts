import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ["error", "warn", "log"],
    });

    const swaggerConfig = new DocumentBuilder()
        .setTitle("FastPass")
        .setDescription("FastPass Api")
        .setVersion("1.0")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, documentFactory);

    const configService = app.get(ConfigService);
    const PORT: number = configService.get("API_PORT") ?? 3000;

    app.enableCors({ origin: true, credentials: true });
    app.use(cookieParser());

    await app.listen(PORT, () => console.log(`server running on port ${PORT}, ${process.env.NODE_ENV}`));
}

bootstrap();
