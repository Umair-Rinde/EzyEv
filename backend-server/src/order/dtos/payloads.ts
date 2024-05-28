import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Min } from 'class-validator';

export class AddItemToOrderPayload {
    @IsUUID()
    @ApiProperty({ type: 'string', format: 'uuid' })
    productVariantId: string;

    @Min(1)
    @ApiProperty({ type: 'number' })
    quantity: number;
}

export class RemoveOrderLinePayload {
    @IsUUID()
    @ApiProperty({ type: 'string', format: 'uuid' })
    orderLineId: string;
}
