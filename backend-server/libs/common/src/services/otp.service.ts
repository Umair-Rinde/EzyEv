import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
    constructor(
        private configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}
    async sendOtp(mobile: string) {
        const { data, config } = await firstValueFrom(
            this.httpService.post(
                'api/v5/otp',
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        authKey: this.configService.get('otpConfig.AUTHKEY'),
                    },
                    params: {
                        mobile,
                        template_id: this.configService.get(
                            'otpConfig.TEMPLATE_ID',
                        ),
                    },
                },
            ),
        );
        return data;
    }

    async verifyOtp(mobile: string, otp: string) {
        const { data } = await firstValueFrom(
            this.httpService.post(
                'api/v5/otp/verify',
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        authKey: this.configService.get('otpConfig.AUTHKEY'),
                    },
                    params: {
                        otp,
                        mobile,
                    },
                },
            ),
        );
        return data;
    }

    async resendOtp(mobile: string) {
        //
    }
}
