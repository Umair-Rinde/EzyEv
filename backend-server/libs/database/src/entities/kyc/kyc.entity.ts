import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { KycLineEntity } from '../kyc-line/kyc-line.entity';
import { UserEntity } from '../user';

@Entity({ name: 'kycs' })
export class KycEntity extends AbstractBaseEntity {
    @OneToOne(() => UserEntity, (user) => user.kyc)
    @JoinColumn()
    user: UserEntity;

    @Column('uuid')
    userId: string;

    @OneToMany(() => KycLineEntity, (line) => line.kyc)
    lines: KycLineEntity[];
}
