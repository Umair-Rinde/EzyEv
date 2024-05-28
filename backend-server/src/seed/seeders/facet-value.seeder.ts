import { FacetEntity, FacetValueEntity } from '@app/database';
import { DataSource } from 'typeorm';

export const createDefaultFacetVaue = async (datasource: DataSource) => {
    const facetRepo = datasource.getRepository(FacetEntity);
    const repo = datasource.getRepository(FacetValueEntity);
    const brandNameFacet = await facetRepo.findOneBy({ code: 'brand:name' });

    await repo
        .findOneBy({ facet: { code: 'brand:name' }, code: 'adms' })
        .then((e) =>
            !e
                ? repo.save({
                      facet: brandNameFacet,
                      code: 'adms',
                      name: 'Adms',
                  })
                : e,
        );
    await repo
        .findOneBy({ facet: { code: 'brand:name' }, code: 'raft' })
        .then((e) =>
            !e
                ? repo.save({
                      facet: brandNameFacet,
                      code: 'raft',
                      name: 'Raft',
                  })
                : e,
        );
};
