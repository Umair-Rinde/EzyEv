import { FacetEntity } from '@app/database';
import { DataSource } from 'typeorm';

export const createBrandFacets = async (datasource: DataSource) => {
    const repo = datasource.getRepository(FacetEntity);
    await repo
        .findOneBy({ code: 'brand:name' })
        .then((e) =>
            !e ? repo.save({ name: 'Brand Name', code: 'brand:name' }) : e,
        );
    await repo.findOneBy({ code: 'brand:description' }).then((e) =>
        !e
            ? repo.save({
                  name: 'Brand Description',
                  code: 'brand:description',
              })
            : e,
    );
};

export const createDefaultFacets = async (datasource: DataSource) => {
    await createBrandFacets(datasource);
};
