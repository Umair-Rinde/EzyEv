import { ChildEntity, Column, Index, ManyToOne } from 'typeorm';
import { FulFillmentEntity } from '../fulfillment';
import { OrderLineReferenceEntity } from './order-line-reference.entity';

@ChildEntity()
export class FulfillmentLine extends OrderLineReferenceEntity {
    @Index()
    @ManyToOne(() => FulFillmentEntity, (fulfillment) => fulfillment.lines)
    fulfillment: FulFillmentEntity;

    @Column('uuid')
    fulfillmentId: string;
}
