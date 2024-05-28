import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs('jwtConfig', (): JwtModuleOptions => {
    return {
        secret: process.env['JWT_SECRET'],
    };
});
