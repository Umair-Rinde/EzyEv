import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNumberString, Length } from 'class-validator';

export class LoginPayload {
    @ApiProperty({ type: 'string' })
    @IsMobilePhone('en-IN')
    mobile: string;

    @ApiProperty({ type: 'string' })
    @IsNumberString()
    @Length(4, 4)
    otp: string;
}

export class OtpRequestPayload {
    @ApiProperty({ type: 'string' })
    @IsMobilePhone('en-IN')
    mobile: string;
}

export class UpdateUserPayload {
    @ApiProperty({ type: 'string' })
    firstName: string;

    @ApiProperty({ type: 'string' })
    lastName: string;

    @ApiProperty({ type: 'string' })
    email: string;

    @ApiProperty({ type: 'string' })
    aadhaarNumber: string;
}
