import { AuthenticatedUser } from '@app/common/decorators';
import { UserEntity } from '@app/database';
import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AddItemToOrderPayload } from '../dtos';
import { OrderService } from '../services';

@Controller({ path: 'order/lines', version: '1' })
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('order')
export class OrderLineController {
    constructor(private readonly orderService: OrderService) {}

    @Post('')
    @ApiBody({ type: AddItemToOrderPayload })
    async addItemToOrder(
        @AuthenticatedUser() user: UserEntity,
        @Body() payload: AddItemToOrderPayload,
    ) {
        const order = await this.orderService.getOrCreateOrder(user);
        return this.orderService.addItemToOrder(
            order.id,
            payload.productVariantId,
            payload.quantity,
        );
    }

    @Delete(':orderLineId')
    async removeItemFromOrder(
        @AuthenticatedUser() user: UserEntity,
        @Param('orderLineId') orderLineId: string,
    ) {
        const order = await this.orderService.getActiveOrderForUser(user);
        return this.orderService.removeItemFromOrder(order.id, orderLineId);
    }
}
