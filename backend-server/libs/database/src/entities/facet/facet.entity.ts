import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { FacetValueEntity } from '../facet-value';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@app/common/generics/entities';

@Entity({ name: 'facets' })
export class FacetEntity extends BaseEntity {
    @Column()
    @ApiProperty({ type: 'string' })
    name: string;

    @Column()
    @ApiProperty({ type: 'string' })
    code: string;

    @OneToMany(() => FacetValueEntity, (value) => value.facet)
    @ApiProperty({ type: [FacetValueEntity] })
    values: FacetValueEntity[];
}
