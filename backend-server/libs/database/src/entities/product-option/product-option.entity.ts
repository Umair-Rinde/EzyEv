import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { ProductOptionGroupEntity } from '../product-option-group';

@Entity({ name: 'product_options' })
export class ProductOptionEntity extends AbstractBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @ManyToOne(() => ProductOptionGroupEntity, (group) => group.options)
    group: ProductOptionGroupEntity;

    @Column('uuid')
    groupId: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
