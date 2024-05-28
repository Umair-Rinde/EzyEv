import { Column, Index, ManyToOne } from 'typeorm';
import { AssetEntity } from './asset.entity';
import { AbstractBaseEntity } from '../base';

export abstract class OrderableAssetEntity extends AbstractBaseEntity {
    assetId: string;

    @Index()
    @ManyToOne(() => AssetEntity, { eager: true, onDelete: 'CASCADE' })
    asset: AssetEntity;

    @Column()
    position: number;
}
