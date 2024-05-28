import { FacetEntity } from '@app/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacetController } from './facet.controller';
import { FacetService } from './facet.service';
import { FacetRepository } from './facet.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FacetEntity])], 
    controllers: [FacetController],
    providers: [FacetService,FacetRepository],
    exports:[FacetService,FacetRepository]
})
export class FacetModule {}
