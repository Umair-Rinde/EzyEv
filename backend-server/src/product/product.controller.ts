import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@Controller({ path: 'products', version: '1' })
@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@ApiBearerAuth()
export class ProductController {
    constructor(private readonly service: ProductService) {}
    @Get('')
    async getMany() {
        return this.service.getMany();
    }
}
