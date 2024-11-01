import { IsNotEmpty, IsNumber, IsUUID } from "class-validator"

export class CreateResourceDto {
    @IsNotEmpty()
    date: Date

    @IsNotEmpty()
    time: string

    @IsNotEmpty()
    @IsNumber()
    duration: number
    
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsUUID()
    userId:string
}
