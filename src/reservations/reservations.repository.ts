import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, LessThanOrEqual, Repository } from "typeorm";
import { Reservation } from "./entities/reservation.entity";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { log } from "console";

@Injectable()
export class ReservationsRepository {
    constructor(
        @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
    ) {}

    async findAll() {
        return await this.reservationRepository.find();
    }

    async findOne(id: string) {
        return await this.reservationRepository.findOneBy({ id });
    }

    async findByUser(userId: string) {
        return await this.reservationRepository.find({ where: { userId }, relations: ['resource'] });
    }

    async findByDateAndBeforeTime(date: string, time: string) {
        // Buscar todas las reservas cuya fecha y hora sean menores o iguales al targetDate
        const finded = await this.reservationRepository.find({
          where: {
            date: date, // Compara con la misma fecha
            time: LessThanOrEqual(time), // Usamos LessThanOrEqual para buscar las reservas antes o igual a esa hora
          },
        });
      
        return finded;
      }

    async count(day: string, time: string) {
        return await this.reservationRepository.count({ where: { day, time } });
    }

    async getAvailableTimes(resourceId: string, weekDays: string[], resourceCapacity: number): Promise<any[]> {
        // Obtener las reservas agrupadas por día y hora
        const reservations = await this.reservationRepository
            .createQueryBuilder('reservation')
            .select(['reservation.day as day', 'reservation.time as time', 'COUNT(reservation.id) as count'])
            .where('reservation.resourceId = :resourceId', { resourceId })
            .andWhere('reservation.day IN (:...weekDays)', { weekDays })
            .groupBy('reservation.day, reservation.time')
            .getRawMany();
    
        const unavailableTimes = weekDays.map(day => {
            // Filtrar las reservas del día actual
            const dayReservations = reservations.filter(res => res.day === day);
        
            // Mapear los horarios que no tienen cupos disponibles
            const timesWithoutCupos = dayReservations
                .filter(res => +res.count >= resourceCapacity) // Verificar si no hay cupos disponibles
                .map(res => res.time); // Extraer los horarios no disponibles
        
            return { day, times: timesWithoutCupos }; // Devolver días y horarios no disponibles
        });
        
        return unavailableTimes;
    }
    

    async create(createReservationDto: CreateReservationDto) {
        return await this.reservationRepository.save(createReservationDto);
    }

    async update(id: string, updateReservationDto: UpdateReservationDto) {
        return await this.reservationRepository.update({ id }, updateReservationDto);
    }

    async remove(id: string) {
        return await this.reservationRepository.delete({ id });
    }
}