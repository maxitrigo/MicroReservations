import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { ResourcesRepository } from './resources.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resources } from './entities/resource.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Resources])],
  controllers: [ResourcesController],
  providers: [ResourcesService, ResourcesRepository],
  exports:[ResourcesService]
})
export class ResourcesModule {}
