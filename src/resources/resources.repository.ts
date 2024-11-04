import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resources } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesRepository {
    constructor(
        @InjectRepository(Resources) private readonly resourcesRepository: Repository<Resources>,
    ) {}

    findAll() {
        return this.resourcesRepository.find();
    }

    findOne(id: string) {
        return this.resourcesRepository.findOneBy({ id });
    }
    
    create(createResourceDto: CreateResourceDto) {
        const resource = this.resourcesRepository.create(createResourceDto);
        return this.resourcesRepository.save(resource);
    }

    update(id: string, updateResourceDto: UpdateResourceDto) {
        return this.resourcesRepository.update({ id }, updateResourceDto);
    }

    delete(id: string) {
        return this.resourcesRepository.delete({ id });
    }
}