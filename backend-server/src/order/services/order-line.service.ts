import { OrderLineEntity, ProductVariantEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from './order.service';

@Injectable()
export class OrderLineService {
    constructor(
        @InjectRepository(OrderLineEntity)
        private readonly repo: Repository<OrderLineEntity>,
        @InjectRepository(ProductVariantEntity)
        private readonly productVariantRepo: Repository<ProductVariantEntity>,
        private readonly orderService: OrderService,
    ) {}
}
