import { HttpModuleOptions } from '@nestjs/axios';
import { registerAs } from '@nestjs/config';

export const otpServiceConfig = registerAs(
    'otpConfig',
    (): {
        httpOptions: HttpModuleOptions;
        AUTHKEY: string;
        TEMPLATE_ID: string;
    } => {
        return {
            httpOptions: {
                baseURL: process.env['OTP_SERVICE_BASE_URL'],
            },
            AUTHKEY: process.env['OTP_SERVICE_AUTHKEY'],
            TEMPLATE_ID: process.env['OTP_SERVICE_TEMPLATE_ID'],
        };
    },
);
