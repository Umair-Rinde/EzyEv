import { Entity, Index, ManyToOne } from 'typeorm';
import { OrderableAssetEntity } from '../asset';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_assets' })
export class ProductAssetEntity extends OrderableAssetEntity {
    productId: string;

    @Index()
    @ManyToOne(() => ProductEntity, (product) => product.assets, {
        onDelete: 'CASCADE',
    })
    product: ProductEntity;
}
