import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/Roles/roles.enum';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    private readonly jwtService: JwtService
  ) {}
  
  async findAll() {
    return await this.reservationsRepository.findAll();
  }
  
  async findOne(id: string) {
    return await this.reservationsRepository.findOne(id);
  }

  async findByUser(token: string) {
    const decode = this.jwtService.decode(token);
    const userId = decode.id
    return await this.reservationsRepository.findByUser(userId);
  }
  
  async create(createReservationDto: CreateReservationDto) {
    const { date, time } = createReservationDto;
    const count = await this.reservationsRepository.count(date, time);
    if (count >= 10) {
      throw new UnauthorizedException('The reservation is full');
    }
    await this.reservationsRepository.create(createReservationDto);
  }
  
  async update(id: string, updateReservationDto: UpdateReservationDto, token: string) {
    const decode = this.jwtService.decode(token);
    const role = decode.role
    const userId = decode.id
    const reservation = await this.reservationsRepository.findOne(id);
    const isUpdated = reservation.updatedAt
    if ( ( isUpdated === null && userId === reservation.userId ) || role === Roles.Admin ) {
      return await this.reservationsRepository.update(id, updateReservationDto);
    }
    throw new UnauthorizedException('You are not authorized to update this reservation');
  }

  async remove(id: string, token: string) {
    const reservation = await this.reservationsRepository.findOne(id);
    const reservationDate = new Date(reservation.date);
    const oneHourLater = new Date(reservationDate.getTime() + 60 * 60 * 1000);
    const decode = this.jwtService.decode(token);
    const role = decode.role
    const userId = decode.id
    if ( ( reservationDate > oneHourLater  && userId === reservation.userId ) || role === Roles.Admin ) {
      return await this.reservationsRepository.remove(id);
    }
    throw new UnauthorizedException('You are not authorized to delete this reservation');
  }
}
