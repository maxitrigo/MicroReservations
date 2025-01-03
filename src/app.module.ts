import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { DatabaseModule } from './database/database.module';
import { ResourcesModule } from './resources/resources.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/env.config';

@Module({
  imports: [
    ReservationsModule, 
    DatabaseModule, 
    ResourcesModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
