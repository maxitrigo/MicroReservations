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

    async findAll() {
        return await this.resourcesRepository.find();
    }

    async findOne(id: string) {
        return await this.resourcesRepository.findOneBy({ id });
    }
    
    async create(createResourceDto: CreateResourceDto) {
        const resource = await this.resourcesRepository.create(createResourceDto);
        return await this.resourcesRepository.save(resource);
    }

    async update(id: string, updateResourceDto: UpdateResourceDto) {
        return await this.resourcesRepository.update({ id }, updateResourceDto);
    }

    async delete(id: string) {
        return await this.resourcesRepository.delete({ id });
    }
}