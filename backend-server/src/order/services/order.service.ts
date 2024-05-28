import {
    OrderEntity,
    OrderLineEntity,
    ProductVariantEntity,
    UserEntity,
} from '@app/database';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { EntityNotFoundError, IsNull, Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly repo: Repository<OrderEntity>,
        @InjectRepository(OrderLineEntity)
        private readonly orderLineRepo: Repository<OrderLineEntity>,
        @InjectRepository(ProductVariantEntity)
        private readonly productVariantRepo: Repository<ProductVariantEntity>,
    ) {}

    async findOne(id: string) {
        return this.repo.findOne({
            where: {
                id,
            },
            relations: ['user', 'lines', 'lines.productVariant'],
        });
    }

    async createActiveOrder(user: UserEntity) {
        return this.repo.save({
            userId: user.id,
            code: nanoid(),
            billingAddress: [],
            shippingAddress: [],
            lines: [],
        } as Partial<OrderEntity>);
    }

    async getActiveOrderForUser(user: UserEntity) {
        const order = await this.repo.findOne({
            where: {
                userId: user.id,
                active: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
        if (order) {
            return this.findOne(order.id);
        }
    }

    async getOrCreateOrder(user: UserEntity) {
        const order = await this.getActiveOrderForUser(user);
        if (!order) {
            return this.createActiveOrder(user);
        }
        return order;
    }

    async addItemToOrder(
        orderId: string,
        productVariantId: string,
        quantity: number,
    ) {
        const order = await this.getOrderOrThrow(orderId);
        const variant = await this.productVariantRepo.findOneOrFail({
            where: {
                id: productVariantId,
                enabled: true,
                deletedAt: IsNull(),
            },
            relations: ['product'],
        });
        if (variant.product.enabled === false) {
            throw new BadRequestException(
                `product ${variant.product.id} is not active`,
            );
        }
        const orderLine = await this.getOrCreateOrderLine(
            order.id,
            productVariantId,
        );
        if (orderLine.quantity !== quantity) {
            orderLine.quantity = quantity;
        }
        orderLine.listPrice = variant.price;
        await this.orderLineRepo.save(orderLine);
        await this.calculateOrderTotals(order);
        await this.repo.save(order);
        return this.findOne(order.id);
    }

    async removeItemFromOrder(orderId: string, orderLineId: string) {
        await this.orderLineRepo.delete({
            order: {
                id: orderId,
            },
            id: orderLineId,
        });
        const order = await this.getOrderOrThrow(orderId);
        this.calculateOrderTotals(order);
        await this.repo.save(order);
        return order;
    }

    async getOrderOrThrow(orderId: string) {
        const order = await this.findOne(orderId);
        if (!order) {
            throw new EntityNotFoundError('Order', orderId);
        }
        return order;
    }

    async getOrCreateOrderLine(orderId: string, productVariantId: string) {
        const orderLine = await this.orderLineRepo.findOne({
            where: {
                order: {
                    id: orderId,
                },
                productVariantId,
            },
        });
        if (!orderLine) {
            return this.orderLineRepo.save({
                order: {
                    id: orderId,
                },
                productVariantId,
                quantity: 0,
                listPrice: 0,
            });
        }
        return orderLine;
    }

    async calculateOrderTotals(order: OrderEntity) {
        let totalPrice = 0;
        for (const line of order.lines) {
            totalPrice += line.listPrice;
        }
        order.subTotal = totalPrice;
    }
}
