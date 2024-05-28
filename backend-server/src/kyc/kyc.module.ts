import { Module } from '@nestjs/common';
import { KycLinesController } from './kyc-lines.controller';
import { KycService } from './kyc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycEntity, KycLineEntity, UserEntity } from '@app/database';

@Module({
    imports: [TypeOrmModule.forFeature([KycEntity, KycLineEntity, UserEntity])],
    controllers: [KycLinesController],
    providers: [KycService],
})
export class KycModule {}
