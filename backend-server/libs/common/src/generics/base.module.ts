import { Module } from '@nestjs/common';
import { FacetModule } from 'src/facet/facet.module';
import { BaseService } from './base.service';

@Module({
  imports: [FacetModule],
  providers: [BaseService as any],
  exports: [BaseService],
})
export class BaseModule {}