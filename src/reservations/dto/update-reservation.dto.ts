import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {

    @ApiProperty({ example: '2022-01-01' })
    date?: string;

    @ApiProperty({ example: '10:00' })
    time?: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    userId?: string;

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    resourceId?: string;
}
