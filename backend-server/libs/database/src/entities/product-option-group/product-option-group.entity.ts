import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { ProductOptionEntity } from '../product-option';

@Entity({ name: 'product_option_groups' })
export class ProductOptionGroupEntity extends AbstractBaseEntity {
    @Column()
    name: string;

    @Column()
    code: string;

    @OneToMany(() => ProductOptionEntity, (option) => option.group)
    options: ProductOptionEntity[];

    @DeleteDateColumn()
    deletedAt: Date;
}
