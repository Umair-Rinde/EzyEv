import { registerAs } from '@nestjs/config';
import { Params } from 'nestjs-pino';

export const loggerConfig = registerAs('loggerConfig', (): Params => {
    return {
        pinoHttp: {
            transport: {
                target: 'pino-http-print',
                options: {
                    colorize: true,
                    destination: 1,
                    all: true,
                },
            },
        },
    };
});
