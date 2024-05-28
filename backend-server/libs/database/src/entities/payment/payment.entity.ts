import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { PaymentState } from '@app/common';
import { OrderEntity } from '../order';

@Entity({ name: 'payments' })
export class PaymentEntity extends AbstractBaseEntity {
    @Column()
    method: string;

    @Column('bigint')
    amount: number;

    @Column('varchar')
    state: PaymentState;

    @Column('varchar', { nullable: true })
    transactionId: string;

    @Index()
    @ManyToOne(() => OrderEntity, (order) => order.payments)
    order: OrderEntity;
}
