import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateReservationDto {
    @IsNotEmpty()
    date: Date

    @IsNotEmpty()
    time: string

    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsNotEmpty()
    @IsUUID()
    resourceId: string
}
