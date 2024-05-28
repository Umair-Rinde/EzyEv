import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductVariantEntity } from '@app/database';

@Controller({ path: 'product-variants', version: '1' })
@UseGuards(AuthGuard('jwt'))
@ApiTags('product-variants')
@ApiBearerAuth()
export class ProductVariantController {
    constructor(private readonly service: ProductVariantService) {}

    @Get(':id')
    @ApiOkResponse({ type: ProductVariantEntity })
    async getOne(@Param('id') id: string) {
        return this.service.getOne(id);
    }
}
