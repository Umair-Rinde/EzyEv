import { ProductEntity } from '@app/database';
import { DataSource } from 'typeorm';

export const createDefaultProducts = async (datasource: DataSource) => {
    const repo = datasource.getRepository(ProductEntity);

    await repo.findOneBy({ name: 'Bike', slug: 'bike' }).then((e) =>
        !e
            ? repo.save({
                  name: 'Bike',
                  slug: 'bike',
              })
            : e,
    );
};
