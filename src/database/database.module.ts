import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } from 'src/config/env.config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
          type: DB_TYPE as any, // o 'mysql', 'sqlite', etc.
          host: DB_HOST,
          port: DB_PORT, // Cambia el puerto según tu base de datos
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_DATABASE_NAME,
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*{.ts,.js}'],
          synchronize: false, // No usar en producción
          migrationsRun: true
        }),
      ],
})
export class DatabaseModule {}
