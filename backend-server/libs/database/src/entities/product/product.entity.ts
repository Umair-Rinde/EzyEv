import {
    Column,
    DeleteDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { ProductAssetEntity } from './product-asset.entity';
import { AssetEntity } from '../asset';
import { ProductVariantEntity } from '../product-variant';
import { FacetValueEntity } from '../facet-value';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class ProductEntity extends AbstractBaseEntity {
    @Column()
    @ApiProperty({ type: 'string' })
    name: string;

    @Column()
    @ApiProperty({ type: 'string' })
    slug: string;

    @Column({ nullable: true })
    @ApiProperty({ type: 'string' })
    description: string;

    @Column({ default: true })
    @ApiProperty({ type: 'boolean' })
    enabled: boolean;

    @Index()
    @ManyToOne(() => AssetEntity, { onDelete: 'SET NULL' })
    @ApiProperty({ type: AssetEntity })
    featuredAsset: AssetEntity;

    @OneToMany(() => ProductAssetEntity, (productAsset) => productAsset.product)
    @ApiProperty({ type: [ProductAssetEntity], isArray: true })
    assets: ProductAssetEntity[];

    @OneToMany(() => ProductVariantEntity, (variant) => variant.product)
    @ApiProperty({ type: [ProductVariantEntity] })
    variants: ProductVariantEntity[];

    @ManyToMany(() => FacetValueEntity, { cascade: true })
    @JoinTable({
        name: 'product_facet_values',
    })
    @ApiProperty({ type: [FacetValueEntity] })
    facetValues: FacetValueEntity[];

    @DeleteDateColumn()
    deletedAt: Date;
}
