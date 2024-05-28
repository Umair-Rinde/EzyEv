import {
    FacetValueEntity,
    ProductEntity,
    ProductOptionEntity,
    ProductVariantEntity,
} from '@app/database';
import { DataSource } from 'typeorm';

export const createDefaultProductVariants = async (datasource: DataSource) => {
    const repo = datasource.getRepository(ProductVariantEntity);
    const optionsRepo = datasource.getRepository(ProductOptionEntity);
    const bikeProduct = await datasource
        .getRepository(ProductEntity)
        .findOneBy({ name: 'Bike' });
    const options = await optionsRepo.find({ relations: ['group'] });
    const brandFacets = await datasource.getRepository(FacetValueEntity).find({
        where: {
            facet: {
                code: 'brand:name',
            },
        },
        relations: ['facet'],
    });

    await repo
        .findOneBy({ name: 'Vroom', product: { name: 'Bike' } })
        .then((e) =>
            !e
                ? repo.save({
                      name: 'Vroom',
                      product: bikeProduct,
                      sku: 'vroom',
                      price: 80000 * 100,
                      description:
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                      options: [
                          options.find(
                              (o) =>
                                  o.code === '80' &&
                                  o.group.code === 'bike:speed',
                          ),
                          options.find(
                              (o) =>
                                  o.code === '200' &&
                                  o.group.code === 'bike:wattage',
                          ),
                          options.find(
                              (o) =>
                                  o.code === '80' &&
                                  o.group.code === 'bike:range',
                          ),
                          options.find(
                              (o) =>
                                  o.code === '24' &&
                                  o.group.code === 'subscription:tenure',
                          ),
                      ] as any,
                      facetValues: [brandFacets.find((b) => b.code === 'adms')],
                  })
                : e,
        );
    await repo
        .findOneBy({ name: 'Phoenix', product: { name: 'Bike' } })
        .then((e) =>
            !e
                ? repo.save({
                      name: 'Phoenix',
                      product: bikeProduct,
                      sku: 'phoenix',
                      price: 120000 * 100,
                      description:
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                      options: [
                          options.find(
                              (o) =>
                                  o.code === '180' &&
                                  o.group.code === 'bike:speed',
                          ),
                          options.find(
                              (o) =>
                                  o.code === '600' &&
                                  o.group.code === 'bike:wattage',
                          ),
                          options.find(
                              (o) =>
                                  o.code === '180' &&
                                  o.group.code === 'bike:range',
                          ),
                          options.find(
                              (o) =>
                                  o.code === '24' &&
                                  o.group.code === 'subscription:tenure',
                          ),
                      ],
                      facetValues: [brandFacets.find((b) => b.code === 'adms')],
                  } as any)
                : e,
        );
};
