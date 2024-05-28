import {
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { OrderLineEntity } from '../order-line';
import { UserEntity } from '../user';
import { OrderAddress } from '@app/common';
import { FulFillmentEntity } from '../fulfillment/fulfillment';
import { PaymentEntity } from '../payment/payment.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends AbstractBaseEntity {
    @Column('varchar')
    @Index({ unique: true })
    code: string;

    @OneToMany(() => OrderLineEntity, (line) => line.order)
    lines: OrderLineEntity[];

    @Column('bigint', { default: 0 })
    subTotal: number;

    @Column({ nullable: true })
    orderPlacedAt: Date;

    @Column({ default: true })
    active: boolean;

    @ManyToMany(() => FulFillmentEntity)
    @JoinTable()
    fulfillments: FulFillmentEntity;

    @OneToMany(() => PaymentEntity, (payment) => payment.order)
    payments: PaymentEntity[];

    @Index()
    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @Column('uuid')
    userId: string;

    @Column('simple-json')
    shippingAddress: OrderAddress;

    @Column('simple-json')
    billingAddress: OrderAddress;
}
