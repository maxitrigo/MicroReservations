import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from "./entities/reservation.entity";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { CreateReservationDto } from "./dto/create-reservation.dto";

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
        return await this.reservationRepository.find({ where: { userId } });
    }

    async count(date: string, time: string) {
        return await this.reservationRepository.count({ where: { date, time } });
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