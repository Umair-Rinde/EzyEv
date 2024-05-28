import { Column, Entity } from 'typeorm';
import { AbstractBaseEntity } from '../base';
import { AssetType } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'assets' })
export class AssetEntity extends AbstractBaseEntity {
    @Column()
    @ApiProperty({ type: 'string' })
    name: string;

    @Column('varchar')
    @ApiProperty({ type: 'string' })
    type: AssetType;

    @Column()
    @ApiProperty({ type: 'string' })
    mimetype: string;

    @Column()
    @ApiProperty({ type: 'number' })
    fileSize: number;

    @Column()
    @ApiProperty({ type: 'string' })
    source: string;

    @Column()
    @ApiProperty({ type: 'string' })
    preview: string;
}
