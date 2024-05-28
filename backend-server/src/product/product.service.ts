import { ProductEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repo: Repository<ProductEntity>,
    ) {}

    async getMany() {
        return this.repo.find({
            relations: [
                'variants',
                'variants.options',
                'variants.options.group',
                'variants.facetValues',
                'variants.facetValues.facet',
            ],
        });
    }
}
