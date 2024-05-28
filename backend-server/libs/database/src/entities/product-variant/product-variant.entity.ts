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
import { AssetEntity } from '../asset';
import { AbstractBaseEntity } from '../base';
import { ProductEntity } from '../product';
import { ProductOptionEntity } from '../product-option';
import { FacetValueEntity } from '../facet-value';
import { ProductVariantAssetEntity } from './product-variant-asset.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'product_variants' })
export class ProductVariantEntity extends AbstractBaseEntity {
    @Column()
    @ApiProperty({ type: 'string' })
    name: string;

    @Column()
    @ApiProperty({ type: 'string' })
    sku: string;

    @Column({ default: true })
    @ApiProperty({ type: 'boolean' })
    enabled: boolean;

    @Column('text')
    description: string;

    // This value is stored as int as lowest possible denominator
    // It means 1 INR will be stored a 100, cause 1 INR equals to 100 paisa
    @Column('bigint')
    @ApiProperty({ type: 'string' })
    price: number;

    @Index()
    @ManyToOne(() => AssetEntity, { onDelete: 'SET NULL' })
    @ApiProperty({ type: AssetEntity })
    featuredAsset: AssetEntity;

    @OneToMany(
        () => ProductVariantAssetEntity,
        (productAsset) => productAsset.product,
    )
    @ApiProperty({ type: [ProductVariantAssetEntity] })
    assets: ProductVariantAssetEntity[];

    @ManyToMany(() => FacetValueEntity)
    @JoinTable({
        name: 'product_variant_facet_values',
    })
    @ApiProperty({ type: [FacetValueEntity] })
    facetValues: FacetValueEntity[];

    @Index()
    @ManyToOne(() => ProductEntity, (product) => product.variants)
    @ApiProperty({ type: ProductEntity })
    product: ProductEntity;

    @Column('uuid', { nullable: true })
    @ApiProperty({ type: 'string', format: 'uuid' })
    productId: string;

    @ManyToMany(() => ProductOptionEntity)
    @JoinTable({
        name: 'product_variant_options',
    })
    @ApiProperty({ type: ProductOptionEntity })
    options: ProductOptionEntity;

    @DeleteDateColumn()
    deletedAt: Date;
}
