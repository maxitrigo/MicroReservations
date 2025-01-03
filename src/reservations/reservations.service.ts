import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/Roles/roles.enum';
import { ResourcesService } from 'src/resources/resources.service';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    private readonly resourcesService: ResourcesService,
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
  
  async create(createReservationDto: CreateReservationDto, token: string) {
    const decode = this.jwtService.decode(token);
    const userId = decode.id;
    createReservationDto.userId = userId;
    const { date, time } = createReservationDto;
    const capacity = (await this.resourcesService.findOne(createReservationDto.resourceId)).capacity;
    
    const count = await this.reservationsRepository.count(date, time);
    if (count >= capacity) {
      throw new UnauthorizedException('The reservation is full');
    }
  
    // Obtener la hora actual en UTC-3
    const now = new Date();
    const nowUTCMinus3 = new Date(now.getTime() - (3 * 60 * 60 * 1000)); // Restamos 3 horas para UTC-3
    const currentTimeString = nowUTCMinus3.toISOString().slice(11, 16); // Formato 'HH:mm'
    const currentTime = currentTimeString.split(':').join('');
    const reservation = time.split(':').join('');
  
  
    // Si la diferencia es menor a 2 horas, el estado es 'Pending', de lo contrario, 'Confirmed'
    if (parseInt(currentTime) + 200 < parseInt(reservation)) {
      createReservationDto.status = 'Pending';
    } else {
      createReservationDto.status = 'Confirmed';
    }
  
    // Crear la reserva
    return await this.reservationsRepository.create(createReservationDto);
  }
  
  

  async confirm (token: string) {
    const decoded = this.jwtService.decode(token)
    const userId = decoded.id
    const reservations = await this.reservationsRepository.findByUser(userId)
    const reservation = reservations[0]
    if (reservation.status === 'Pending'){
      await this.reservationsRepository.update(reservation.id, {status: "Confirmed"})
      return true
    }
    return false
  }


  @Cron('0 * * * *') // Ejecuta cada hora
  async confirmAndDeleteReservations() {
    // Obtener la hora actual UTC
    const now = new Date();
  
    // Ajustar la hora a UTC-3 (restando 3 horas)
    const nowUTCMinus3 = new Date(now.getTime() - (3 * 60 * 60 * 1000)); // Restamos 3 horas para UTC-3
  
    // Calcular el target time sumando 2 horas a la hora ajustada
    const targetTime = new Date(nowUTCMinus3.getTime() + 2 * 60 * 60 * 1000); // Suma 2 horas
    const targetTimeString = targetTime.toISOString().slice(11, 16); // Hora en formato 'HH:mm'
    const targetDate = targetTime.toISOString().slice(0, 10); // Fecha en formato 'YYYY-MM-DD'
  
    // Calcular la hora pasada restando 1 hora a la hora ajustada
    const pastTime = new Date(nowUTCMinus3.getTime() - 1 * 60 * 60 * 1000); // Resta 1 hora
    const pastTimeString = pastTime.toISOString().slice(11, 16); // Hora en formato 'HH:mm'
    const pastDate = pastTime.toISOString().slice(0, 10); // Fecha en formato 'YYYY-MM-DD'
    
    try {
      // Confirmar reservas pendientes
      const reservations = await this.reservationsRepository.findByDateAndBeforeTime(targetDate, targetTimeString);
      const pendingReservations = reservations.filter(
        (reservation) => reservation.status === 'Pending',
      );
  
      if (pendingReservations.length > 0) {
        await Promise.all(
          pendingReservations.map((reservation) =>
            this.reservationsRepository.update(reservation.id, { status: 'Confirmed' }),
          ),
        );
        console.log(
          `Actualizadas ${pendingReservations.length} reservaciones pendientes para ${targetDate} hasta las ${targetTimeString}.`,
        );
      } else {
        console.log(`No hay reservaciones pendientes hasta las ${targetTimeString}.`);
      }
  
      // Borrar reservas pasadas
      const pastReservations = await this.reservationsRepository.findByDateAndBeforeTime(pastDate, pastTimeString);
      
      if (pastReservations.length > 0) {
        await Promise.all(
          pastReservations.map((reservation) =>
            this.reservationsRepository.remove(reservation.id),
          ),
        );
        console.log(
          `Eliminadas ${pastReservations.length} reservaciones que pasaron más de una hora desde ${pastDate} hasta las ${pastTimeString}.`,
        );
      } else {
        console.log(`No hay reservaciones para eliminar que hayan pasado más de una hora.`);
      }
    } catch (error) {
      console.error('Error al procesar las reservaciones:', error);
    }
  }
  
  

  async cancel(id: string, token: string) {
    const reservation = await this.reservationsRepository.findOne(id);
    const reservationDate = reservation.date;
    const reservationTime = reservation.time;
  
    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if(reservation.status === 'Confirmed') {
      throw new UnauthorizedException('La reserva ya fue confirmada');
    }

    if(reservation.status === 'Cancelled') {
      throw new UnauthorizedException('La reserva ya fue cancelada');
    }
  
    // Obtener la fecha y hora local actual
    const now = new Date();
    const dateNow = now.toISOString().slice(0, 10);  // Fecha actual en formato 'YYYY-MM-DD'
    const timeNow = now.getHours() * 60 + now.getMinutes();  // Hora actual en minutos desde medianoche
  
    // Obtener la hora de la reserva en minutos desde medianoche
    const [reservationHour, reservationMinute] = reservationTime.split(':').map(Number);
    const reservationTimeInMinutes = reservationHour * 60 + reservationMinute;
  
    // Verificar si la fecha de la reserva es igual o posterior a la fecha actual
    // y si la diferencia entre la hora actual y la hora de la reserva es de al menos 2 horas
    if (reservationDate >= dateNow && reservationTimeInMinutes - timeNow >= 120) {
      const decode = this.jwtService.decode(token);
      const role = decode.role;
      const userId = decode.id;
  
      if (userId === reservation.userId || role === Roles.Admin) {
        const response = await axios.post('http://localhost:3000/users/cancel-reservations',{}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.data) {
          const result = await this.reservationsRepository.update(id, { status: "Cancelled" });
          return result
        } else {
          throw new UnauthorizedException('You are not authorized to delete this reservation');
        }
      }
      throw new UnauthorizedException('You are not authorized to delete this reservation');
    } else {
      console.log('No se puede cancelar la reserva (menos de 2 horas antes)');
      throw new Error('Cannot cancel reservation within 2 hours');
    }
  }
  
  

  async getAvailableTimes(resourceId: string, weekDays: string[], resourceCapacity: number) {
    return await this.reservationsRepository.getAvailableTimes(resourceId, weekDays, resourceCapacity);
  }
}
