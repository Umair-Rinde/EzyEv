import { BadRequestException, Controller, Post, Query } from '@nestjs/common';

@Controller({ path: 'api/v5' })
export class MockOtpController {
    @Post('otp')
    async sendOtp(@Query('mobile') _mobile: string) {}

    @Post('otp/verify')
    async verifyOtp(
        @Query('otp') otp: string,
        @Query('mobile') _mobile: string,
    ) {
        if (otp !== '2222') {
            throw new BadRequestException('otp mismatch');
        }
        return {};
    }
}
