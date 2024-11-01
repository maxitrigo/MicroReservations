import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ReservationsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
