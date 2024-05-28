import { entities } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import {
    createDefaultProducts,
    createDefaultFacetVaue,
    createDefaultFacets,
    createDefaultProductOptionGroups,
    createDefaultProductOptions,
} from './seeders';
import { createDefaultProductVariants } from './seeders/product-variant.seeder';

@Injectable()
export class SeedDataService {
    datasource: DataSource;

    constructor(
        @InjectPinoLogger(SeedDataService.name)
        private readonly logger: PinoLogger,
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {}

    async runDefaultSeed() {
        await this.createConnection(Object.values(entities));

        await this.tryExecute('Facets', createDefaultFacets(this.datasource));
        await this.tryExecute(
            'FacetValues',
            createDefaultFacetVaue(this.datasource),
        );
        await this.tryExecute(
            'Products',
            createDefaultProducts(this.datasource),
        );
        await this.tryExecute(
            'ProductOptionGroups',
            createDefaultProductOptionGroups(this.datasource),
        );
        await this.tryExecute(
            'ProductOptions',
            createDefaultProductOptions(this.datasource),
        );
        await this.tryExecute(
            'ProductVariants',
            createDefaultProductVariants(this.datasource),
        );

        await this.closeConnection();
    }

    private async createConnection(entities?: any[]) {
        if (!this.datasource) {
            this.logger.info(
                'NOTE: Database connection doesnt exists so creating a new one',
            );
        }
        if (!this.datasource || !this.datasource.isInitialized) {
            try {
                const dbConfig = this.configService.get('databaseConfig');
                const dataSource = new DataSource({
                    ...dbConfig,
                    entities,
                });
                if (!dataSource.isInitialized) {
                    this.datasource = await dataSource.initialize();
                    this.logger.info('✅ CONNECTED TO DATABASE!');
                }
            } catch (error) {
                this.handleError(error);
            }
        }
    }

    private async closeConnection() {
        try {
            if (this.datasource && this.datasource.isInitialized) {
                await this.datasource.destroy();
                this.logger.info('✅ DISCONNECTED TO DATABASE!');
            }
        } catch (error) {
            this.logger.info(
                'NOTE: Database connection doesnt exists yet. Cant close connection',
            );
        }
    }

    private tryExecute<T>(
        name: string,
        p: Promise<T> | (() => Promise<T>),
    ): Promise<T> | Promise<void> {
        this.logger.info(`SEEDING ${name}`);
        return (typeof p === 'function' ? p() : (p as any)).then(
            (x: T) => x,
            (error: Error) => {
                this.logger.error(
                    `🛑 ERROR: ${error ? error.message : 'unknown'}`,
                );
            },
        );
    }

    private handleError(error: Error, message?: string) {
        this.logger.info(
            `🛑 ERROR: ${message ? message + '-> ' : ''} ${
                error ? error.message : ''
            }`,
        );
        throw error;
    }
}
