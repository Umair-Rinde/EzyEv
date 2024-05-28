import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { KycService } from './kyc.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddKycLinePayload } from './dtos';
import { AuthenticatedUser } from '@app/common/decorators';
import { UserEntity } from '@app/database';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: 'kycs/lines', version: '1' })
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('kycs')
export class KycLinesController {
    constructor(private readonly service: KycService) {}

    @Post('')
    async addItemToKyc(
        @AuthenticatedUser() user: UserEntity,
        @Body() payload: AddKycLinePayload,
    ) {
        return this.service.addItemToKyc(user, payload);
    }
}
