import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [typeormConfig]
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.get('typeorm'), // Inyectás la configuración de 'typeorm'
        })
      ],
      exports: []
})
export class DatabaseModule {}
