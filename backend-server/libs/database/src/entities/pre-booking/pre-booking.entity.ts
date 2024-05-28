import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { ProductVariantEntity } from '../product-variant';
import { PreBookingPaymentEntity } from '../pre-booking-payment';

@Entity({ name: 'pre_bookings' })
export class PreBookingEntity extends AbstractBaseEntity {
    @Column('int')
    bookingAmount: number;

    @ManyToOne(() => ProductVariantEntity)
    @JoinColumn()
    productVariant: ProductVariantEntity;

    @Column('uuid')
    productVariantId: string;

    @ManyToOne(() => PreBookingPaymentEntity)
    payment: PreBookingPaymentEntity;

    @Column('date')
    expectedDeliveryAt: Date;
}
