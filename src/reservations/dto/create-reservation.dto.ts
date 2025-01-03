import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateReservationDto {

    @ApiProperty({ example: '2022-01-01' })
    @IsNotEmpty()
    date: string

    @ApiProperty({ example: '10:00' })
    @IsNotEmpty()
    time: string

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsNotEmpty()
    @IsUUID()
    resourceId: string

    @ApiProperty({example: 'Confirmed'})
    status?: 'Confirmed' | 'Pending' | 'Cancelled';
}
