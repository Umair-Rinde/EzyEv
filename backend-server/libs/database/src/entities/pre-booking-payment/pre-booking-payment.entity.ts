import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { PreBookingEntity } from '../pre-booking';
import { PaymentState } from '@app/common';

@Entity({ name: 'pre_booking_payments' })
export class PreBookingPaymentEntity extends AbstractBaseEntity {
    @Column('int')
    amount: number;

    @ManyToOne(() => PreBookingEntity)
    preBooking: PreBookingEntity;

    @Column('varchar')
    transactionId: string;

    @Column('varchar')
    status: PaymentState;
}
