import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, ProductVariantEntity } from '@app/database';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantService } from './product-variant.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, ProductVariantEntity])],
    controllers: [ProductController, ProductVariantController],
    providers: [ProductService, ProductVariantService],
})
export class ProductModule {}
