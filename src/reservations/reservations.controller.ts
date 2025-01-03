import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns all reservations' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  findAll(@Headers('authorization') headers: string) {
    return this.reservationsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('available-times')
  async getAvailableTimes(
    @Query('resourceId') resourceId: string,
    @Query('weekDays') weekDays: string[],
    @Query('capacity') resourceCapacity: number,
  ) {
    return await this.reservationsService.getAvailableTimes(resourceId, weekDays, resourceCapacity);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns reservation by user' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('user')
  findByUser(@Headers('authorization') headers: string) {
    const token = headers.split(' ')[1];
    return this.reservationsService.findByUser(token);
  }
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns reservation by id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') headers: string) {
    return this.reservationsService.findOne(id);
  }

  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Returns created reservation' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @Headers('authorization') headers: string) {
    const token = headers.split(' ')[1];
    const response = this.reservationsService.create(createReservationDto, token);
    return response;
  }


  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns deleted reservation' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') headers: string) {
    const token = headers.split(' ')[1];
    return this.reservationsService.cancel(id, token);
  }
}
