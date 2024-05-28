import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { FulfillmentLine } from '../order-line-reference';
import { FulfillmentState } from '@app/common';

@Entity({ name: 'fulfillments' })
export class FulFillmentEntity extends AbstractBaseEntity {
    @Column()
    trackingCode: string;

    @Column()
    method: string;

    @Column('varchar')
    state: FulfillmentState;

    @OneToMany(
        () => FulfillmentLine,
        (fulfillmentLine) => fulfillmentLine.fulfillment,
    )
    lines: FulfillmentLine[];
}
