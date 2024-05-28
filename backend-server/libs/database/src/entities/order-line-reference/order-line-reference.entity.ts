import { Column, Entity, Index, ManyToOne, TableInheritance } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { OrderLineEntity } from '../order-line/order-line.entity';

@Entity({ name: 'order_line_references' })
@TableInheritance({ column: { type: 'varchar', name: 'descriminator' } })
export class OrderLineReferenceEntity extends AbstractBaseEntity {
    @Column()
    quantity: number;

    @Index()
    @ManyToOne(() => OrderLineEntity, { onDelete: 'CASCADE' })
    orderLine: OrderLineEntity;

    @Column('uuid')
    orderLineId: string;
}
