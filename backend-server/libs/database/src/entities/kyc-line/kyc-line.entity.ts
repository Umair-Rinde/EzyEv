import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { KycEntity } from '../kyc/kyc.entity';
import { KycStatus } from '@app/common';

@Entity({ name: 'kyc_lines' })
@Unique(['type', 'identifier', 'kycId'])
export class KycLineEntity extends AbstractBaseEntity {
    @Column('varchar')
    type: string;

    @Column('varchar')
    identifier: string;

    @Column('varchar')
    status: KycStatus;

    @ManyToOne(() => KycEntity, (kyc) => kyc.lines)
    kyc: KycEntity;

    @Column('uuid')
    kycId: string;
}
