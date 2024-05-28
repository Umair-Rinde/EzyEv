import { BaseService } from '@app/common/generics/base.service';
import { FacetEntity } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacetRepository } from './facet.repository';

@Injectable()
export class FacetService extends BaseService<FacetEntity> {
  constructor(@InjectRepository(FacetEntity) repository: FacetRepository) {
    super(repository);
  }
}