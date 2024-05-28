import { OtpService } from '@app/common';
import { KycEntity, KycLineEntity, UserEntity } from '@app/database';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return configService.get('otpConfig.httpOptions');
            },
        }),
        TypeOrmModule.forFeature([UserEntity, KycEntity, KycLineEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return configService.get('jwtConfig');
            },
        }),
    ],
    controllers: [AuthController],
    providers: [OtpService, AuthService, JwtStrategy],
})
export class AuthModule {}
