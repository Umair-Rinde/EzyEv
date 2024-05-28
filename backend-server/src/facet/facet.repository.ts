import { BaseRepository } from "@app/common/generics/base.repository";
import { IRepository } from "@app/common/generics/interface/repository.interface";
import { FacetEntity } from "@app/database";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class FacetRepository extends BaseRepository<FacetEntity> implements IRepository<FacetEntity> {
    constructor(@InjectRepository(FacetEntity) repository: Repository<FacetEntity>) {
      super(repository);
    }
    
  }