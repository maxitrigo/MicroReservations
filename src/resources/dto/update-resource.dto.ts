import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {

    @ApiProperty({ example: 60 })
    duration?: number;   // Opcional para actualizar la duración

    @ApiProperty({ example: 'Reunion de trabajo, Cancha 1, Clase de Zumba' })
    name?: string;       // Opcional para actualizar el nombre del recurso

    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    userId?: string;     // Opcional para actualizar el ID del encargado
}
