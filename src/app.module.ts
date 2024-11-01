import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { DatabaseModule } from './database/database.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [ReservationsModule, DatabaseModule, ResourcesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
