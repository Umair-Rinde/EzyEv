import { OtpService } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KycEntity, KycLineEntity, UserEntity } from '@app/database';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { UnauthorizedException } from '@nestjs/common';
import { UpdateUserPayload } from './dtos';

export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
        @InjectRepository(KycEntity)
        private readonly kycRepo: Repository<KycEntity>,
        @InjectRepository(KycLineEntity)
        private readonly kycLineRepo: Repository<KycLineEntity>,
        private readonly jwtService: JwtService,
        private readonly otpService: OtpService,
    ) {}

    async getMe(user: UserEntity) {
        const _user = await this.repo.findOne({
            where: {
                id: user.id,
            },
            relations: ['kyc', 'kyc.lines'],
        });
        return _user;
    }

    async updateUser(id: string, payload: UpdateUserPayload) {
        const user = await this.repo.findOne({
            where: {
                id,
            },
            relations: ['kyc', 'kyc.lines'],
        });
        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.email = payload.email;
        if (!user.kyc) {
            user.kyc = await this.kycRepo.save({
                userId: user.id,
            });
        }
        if (payload.aadhaarNumber) {
            let kycLine = await this.kycLineRepo.findOne({
                where: {
                    kycId: user.kyc.id,
                    type: 'AADHAAR',
                    identifier: payload.aadhaarNumber,
                },
            });
            if (!kycLine) {
                kycLine = await this.kycLineRepo.save({
                    identifier: payload.aadhaarNumber,
                    type: 'AADHAAR',
                    kycId: user.kyc.id,
                    status: 'Success',
                });
            }
        }
        await this.repo.save(user);
        return this.repo.findOne({
            where: { id },
            relations: ['kyc', 'kyc.lines'],
        });
    }

    async login(mobile: string, otp: string) {
        // await this.verifyOtp(mobile, otp);
        let user = await this.repo.findOne({
            where: {
                mobilenumber: mobile,
            },
        });
        if (!user) {
            user = await this.repo.save({
                mobilenumber: mobile,
            });
        }
        return this.generateJwtToken(user);
    }

    async sentOtp(mobile: string) {
        return this.otpService.sendOtp(mobile);
    }

    async verifyOtp(mobile: string, otp: string) {
        const res = await this.otpService.verifyOtp(mobile, otp);
        if (res.type === 'error') {
            throw new UnauthorizedException(res.message);
        }
    }

    async generateJwtToken(user: Partial<UserEntity>) {
        const token = await this.jwtService.signAsync(instanceToPlain(user), {
            subject: user.id,
        });
        return {
            accessToken: token,
        };
    }
}
