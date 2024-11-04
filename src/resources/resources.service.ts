import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesRepository } from './resources.repository';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly ResourcesRepository: ResourcesRepository,
  ) {}

  async create(createResourceDto: CreateResourceDto) {
    return await this.ResourcesRepository.create(createResourceDto);
  }

  async findAll() {
    return await this.ResourcesRepository.findAll();
  }

  async findOne(id: string) {
    return await this.ResourcesRepository.findOne(id);
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    return await this.ResourcesRepository.update(id, updateResourceDto);
  }

  async remove(id: string) {
    return await this.ResourcesRepository.delete(id);
  }
}
