import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = registerAs(
    'databaseConfig',
    (): TypeOrmModuleOptions => {
        const env = process.env;
        return {
            type: 'mysql', 
            // url: env['DATABASE_MASTER_URL'],
            host:'127.0.0.1',
            port:3306,
            database: 'ezyev',
            username:'umair',
            password:'1234', 
            synchronize:
                env['NODE_ENV'] === 'development' &&
                env['DATABASE_SYNCHRONIZE'] === 'true',
        };
    },
);
