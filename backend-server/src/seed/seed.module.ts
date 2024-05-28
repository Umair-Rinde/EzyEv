import { Module } from '@nestjs/common';
import { SeedDataService } from './seed.service';

@Module({
    providers: [SeedDataService],
    exports: [SeedDataService],
})
export class SeedModule {}
