import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesRepository } from './resources.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly ResourcesRepository: ResourcesRepository,
    private readonly jwtService: JwtService
  ) {}

  async create(createResourceDto: CreateResourceDto, gymToken: string) {
    const gymId = this.jwtService.decode(gymToken).id;
    return await this.ResourcesRepository.create(createResourceDto, gymId);
  }

  async findOne(id: string) {
    return await this.ResourcesRepository.findOne(id);
  }

  async findByGymId(gymToken: string) {
    const gymId = this.jwtService.decode(gymToken).id;
    return await this.ResourcesRepository.findByGymId(gymId);
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    return await this.ResourcesRepository.update(id, updateResourceDto);
  }

  async remove(id: string) {
    return await this.ResourcesRepository.delete(id);
  }
}
