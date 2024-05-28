import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddKycLinePayload {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string' })
    type: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: 'string' })
    identifier: string;
}
