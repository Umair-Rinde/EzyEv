import { Column, DeleteDateColumn, Entity, OneToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { KycEntity } from '../kyc';

@Entity({ name: 'users' })
export class UserEntity extends AbstractBaseEntity {
    @Column('varchar', { nullable: false })
    firstName: string;

    @Column('varchar', { nullable: false })
    lastName: string;

    @Column('varchar', { nullable: false })
    email: string;

    @Column('varchar', { nullable: false, unique: true })
    mobilenumber: string;

    @Column('varchar',{nullable:false})
    password: string;

    @OneToOne(() => KycEntity, (kyc) => kyc.user, { onDelete: 'SET NULL' })
    kyc: KycEntity;

    @DeleteDateColumn()
    deletedAt: Date;
}
