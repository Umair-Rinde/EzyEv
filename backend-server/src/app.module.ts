import {
    databaseConfig,
    jwtConfig,
    loggerConfig,
    otpServiceConfig,
} from '@app/configs';
import { entities } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { LoggerModule } from 'nestjs-pino';
import { SeedModule } from './seed/seed.module';
import { OrderModule } from './order/order.module';
import { KycModule } from './kyc/kyc.module';
import { BaseModule } from '@app/common/generics/base.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig, otpServiceConfig, jwtConfig, loggerConfig],
            isGlobal: true,
        }),
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return configService.get('loggerConfig');
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    ...configService.get('databaseConfig'),
                    entities: Object.values(entities),
                };
            },
        }),
        AuthModule,
        ProductModule,
        SeedModule,
        OrderModule,
        KycModule,
        BaseModule
        
    ],
})
export class AppModule {}
