import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SeedDataService } from './seed/seed.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
    const logger = app.get(Logger);
    app.useLogger(logger);

    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.useGlobalPipes(new ValidationPipe());

    const swaggerConfig = new DocumentBuilder()
        .setTitle('ezyev')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    const seeder = app.get(SeedDataService);
    await seeder.runDefaultSeed();

    const PORT = configService.get('PORT', 5002);
    const HOST = configService.get('HOST', '0.0.0.0');

    await app.listen(PORT, HOST, () => {
        console.log(`application started listening at http://${HOST}:${PORT}`);
    });
}
bootstrap();
