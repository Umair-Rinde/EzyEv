import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { OrderEntity } from '../order/order.entity';
import { ProductVariantEntity } from '../product-variant';

@Entity({ name: 'order_lines' })
export class OrderLineEntity extends AbstractBaseEntity {
    @Index()
    @ManyToOne(() => ProductVariantEntity)
    productVariant: ProductVariantEntity;

    @Column('uuid')
    productVariantId: string;

    @Column('bigint')
    listPrice: number;

    @Column('int')
    quantity: number;

    @Index()
    @ManyToOne(() => OrderEntity, (order) => order.lines, {
        onDelete: 'CASCADE',
    })
    order: OrderEntity;
}
