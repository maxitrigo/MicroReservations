import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './create-resource.dto';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {

    date?: Date;         // Opcional para actualizar la fecha

    time?: string;       // Opcional para actualizar la hora

    duration?: number;   // Opcional para actualizar la duración

    name?: string;       // Opcional para actualizar el nombre del recurso

    userId?: string;     // Opcional para actualizar el ID del encargado
}
