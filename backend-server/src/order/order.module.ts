import { Module } from '@nestjs/common';
import { OrderController, OrderLineController } from './controllers';
import { OrderLineService, OrderService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    OrderEntity,
    OrderLineEntity,
    ProductVariantEntity,
} from '@app/database';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            OrderLineEntity,
            ProductVariantEntity,
        ]),
    ],
    controllers: [OrderController, OrderLineController],
    providers: [OrderService, OrderLineService],
    exports: [OrderService, OrderLineService],
})
export class OrderModule {}
