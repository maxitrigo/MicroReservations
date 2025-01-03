import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator"

export class CreateResourceDto {

    @ApiProperty({ example: 60 })
    @IsNotEmpty()
    @IsNumber()
    duration: number
    
    @ApiProperty({ example: 'Reunion de trabajo' })
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsNotEmpty()
    @IsUUID()
    userId?:string

}
