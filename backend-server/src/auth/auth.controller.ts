import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginPayload, OtpRequestPayload, UpdateUserPayload } from './dtos';
import { AuthService } from './auth.service';
import { AuthenticatedUser } from '@app/common/decorators';
import { UserEntity } from '@app/database';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: 'auth', version: '1' })
@ApiTags('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}
    @Post('login')
    async login(@Body() payload: LoginPayload) {
        return this.service.login(payload.mobile, payload.otp);
    }

    @Post('otp/request')
    async requestOtp(@Body() payload: OtpRequestPayload) {
        return this.service.sentOtp(payload.mobile);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getMe(@AuthenticatedUser() user: UserEntity) {
        return this.service.getMe(user);
    }

    @Patch('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateUser(
        @AuthenticatedUser() user: UserEntity,
        @Body() payload: UpdateUserPayload,
    ) {
        return this.service.updateUser(user.id, payload);
    }
}
