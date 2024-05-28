import { ProductOptionEntity, ProductOptionGroupEntity } from '@app/database';
import { DataSource } from 'typeorm';

const createWattageOptions = async (datasource: DataSource) => {
    const repo = datasource.getRepository(ProductOptionEntity);
    const groups = await datasource
        .getRepository(ProductOptionGroupEntity)
        .find();

    await repo
        .findOneBy({ code: '200', group: { code: 'bike:wattage' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '200',
                      name: '200',
                      group: groups.find((g) => g.code === 'bike:wattage'),
                  })
                : e,
        );
    await repo
        .findOneBy({ code: '400', group: { code: 'bike:wattage' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '400',
                      name: '400',
                      group: groups.find((g) => g.code === 'bike:wattage'),
                  })
                : e,
        );
    await repo
        .findOneBy({ code: '600', group: { code: 'bike:wattage' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '600',
                      name: '600',
                      group: groups.find((g) => g.code === 'bike:wattage'),
                  })
                : e,
        );
};

const createRangeOptions = async (datasource: DataSource) => {
    const repo = datasource.getRepository(ProductOptionEntity);
    const groups = await datasource
        .getRepository(ProductOptionGroupEntity)
        .find();

    await repo
        .findOneBy({ code: '80', group: { code: 'bike:range' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '80',
                      name: '80',
                      group: groups.find((g) => g.code === 'bike:range'),
                  })
                : e,
        );
    await repo
        .findOneBy({ code: '120', group: { code: 'bike:range' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '120',
                      name: '120',
                      group: groups.find((g) => g.code === 'bike:range'),
                  })
                : e,
        );
    await repo
        .findOneBy({ code: '180', group: { code: 'bike:range' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '180',
                      name: '180',
                      group: groups.find((g) => g.code === 'bike:range'),
                  })
                : e,
        );
};

const createSpeedOptions = async (datasource: DataSource) => {
    const repo = datasource.getRepository(ProductOptionEntity);
    const groups = await datasource
        .getRepository(ProductOptionGroupEntity)
        .find();

    await repo
        .findOneBy({ code: '80', group: { code: 'bike:speed' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '80',
                      name: '80',
                      group: groups.find((g) => g.code === 'bike:speed'),
                  })
                : e,
        );
    await repo
        .findOneBy({ code: '120', group: { code: 'bike:speed' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '120',
                      name: '120',
                      group: groups.find((g) => g.code === 'bike:speed'),
                  })
                : e,
        );
    await repo
        .findOneBy({ code: '180', group: { code: 'bike:speed' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '180',
                      name: '180',
                      group: groups.find((g) => g.code === 'bike:speed'),
                  })
                : e,
        );
};

const createSubscriptionTenureOptions = async (datasource: DataSource) => {
    const repo = datasource.getRepository(ProductOptionEntity);
    const groups = await datasource
        .getRepository(ProductOptionGroupEntity)
        .find();

    await repo
        .findOneBy({ code: '24', group: { code: 'subscription:tenure' } })
        .then((e) =>
            !e
                ? repo.save({
                      code: '24',
                      name: '24',
                      group: groups.find(
                          (g) => g.code === 'subscription:tenure',
                      ),
                  })
                : e,
        );
};

export const createDefaultProductOptions = async (datasource: DataSource) => {
    await createWattageOptions(datasource);
    await createRangeOptions(datasource);
    await createSpeedOptions(datasource);
    await createSubscriptionTenureOptions(datasource);
};
