import { Entity, Index, ManyToOne } from 'typeorm';
import { OrderableAssetEntity } from '../asset';
import { ProductVariantEntity } from '../product-variant';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'product_variant_assets' })
export class ProductVariantAssetEntity extends OrderableAssetEntity {
    productId: string;

    @Index()
    @ManyToOne(
        () => ProductVariantEntity,
        (productVariant) => productVariant.assets,
        {
            onDelete: 'CASCADE',
        },
    )
    @ApiProperty({ type: ProductVariantEntity })
    product: ProductVariantEntity;
}
