import { ProductOptionGroupEntity } from '@app/database';
import { DataSource } from 'typeorm';

export const createDefaultProductOptionGroups = async (
    datasource: DataSource,
) => {
    const repo = datasource.getRepository(ProductOptionGroupEntity);

    await repo.findOneBy({ code: 'bike:range' }).then((e) =>
        !e
            ? repo.save({
                  name: 'Range',
                  code: 'bike:range',
              })
            : e,
    );
    await repo.findOneBy({ code: 'bike:wattage' }).then((e) =>
        !e
            ? repo.save({
                  name: 'Wattage',
                  code: 'bike:wattage',
              })
            : e,
    );
    await repo.findOneBy({ code: 'bike:speed' }).then((e) =>
        !e
            ? repo.save({
                  name: 'Speed',
                  code: 'bike:speed',
              })
            : e,
    );
    await repo.findOneBy({ code: 'subscription:tenure' }).then((e) =>
        !e
            ? repo.save({
                  name: 'Subscription',
                  code: 'subscription:tenure',
              })
            : e,
    );
};
