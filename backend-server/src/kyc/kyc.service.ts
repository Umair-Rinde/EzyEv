import { KycEntity, KycLineEntity, UserEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddKycLinePayload } from './dtos';

@Injectable()
export class KycService {
    constructor(
        @InjectRepository(KycEntity)
        private readonly repo: Repository<KycEntity>,
        @InjectRepository(KycLineEntity)
        private readonly kycLineRepo: Repository<KycLineEntity>,
    ) {}

    async addItemToKyc(user: UserEntity, payload: AddKycLinePayload) {
        let kyc = await this.repo.findOne({
            where: {
                userId: user.id,
            },
            relations: ['lines'],
        });
        if (!kyc) {
            kyc = await this.repo.save({
                userId: user.id,
            });
            kyc = await this.repo.findOne({
                where: { id: kyc.id },
                relations: ['lines'],
            });
        }
        await this.kycLineRepo.save({
            type: payload.type,
            identifier: payload.identifier,
            status: 'Open',
            kycId: kyc.id,
        });
        return this.repo.findOne({
            where: { id: kyc.id },
            relations: ['lines'],
        });
    }
}
