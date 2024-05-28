import { ProductEntity, ProductVariantEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductVariantService {
    constructor(
        @InjectRepository(ProductVariantEntity)
        private readonly repo: Repository<ProductEntity>,
    ) {}

    async getOne(id: string) {
        return this.repo.findOneOrFail({
            where: {
                id,
            },
            relations: [
                'featuredAsset',
                'product',
                'options',
                'options.group',
                'facetValues',
                'facetValues.facet',
            ],
        });
    }
}
