import { Controller} from '@nestjs/common';
import { FacetRepository } from './facet.repository';
import { FacetEntity } from '@app/database';
import { BaseController } from '@app/common/generics/base.controller';

@Controller('facet')
export class FacetController extends BaseController<FacetEntity> {
  constructor(private readonly facetRepository: FacetRepository) {
    super(facetRepository);
  }

}