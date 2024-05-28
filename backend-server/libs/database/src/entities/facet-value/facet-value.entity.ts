import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { FacetEntity } from '../facet';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'facet_values' })
export class FacetValueEntity extends AbstractBaseEntity {
    @Column()
    @ApiProperty({ type: 'string' })
    name: string;

    @Column()
    @ApiProperty({ type: 'string' })
    code: string;

    @Index()
    @ManyToOne(() => FacetEntity, (facet) => facet.values, {
        onDelete: 'CASCADE',
    })
    @ApiProperty({ type: FacetEntity })
    facet: FacetEntity;
}
