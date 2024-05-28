import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderService } from '../services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '@app/common/decorators';
import { UserEntity } from '@app/database';

@Controller({ path: 'order', version: '1' })
@UseGuards(AuthGuard('jwt'))
@ApiTags('order')
@ApiBearerAuth()
export class OrderController {
    constructor(private readonly service: OrderService) {}

    @Get('')
    async getActiveOrder(@AuthenticatedUser() user: UserEntity) {
        return this.service.getActiveOrderForUser(user);
    }
}
