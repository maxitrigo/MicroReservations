import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a resource' })
  @ApiResponse({ status: 201, description: 'The resource has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  @ApiBearerAuth()
  create(@Body('data') createResourceDto: CreateResourceDto, @Body('gymToken') gymToken: string, @Headers('authorization') headers: string) {
    console.log(createResourceDto);
    
    return this.resourcesService.create(createResourceDto, gymToken);
  }

  @Get('byGymId/:gymToken')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a resource by ID' })
  @ApiResponse({ status: 200, description: 'The resource has been successfully fetched.' })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  @ApiBearerAuth()
  findByGymId(@Param('gymToken') gymToken: string, @Headers('authorization') headers: string) {
    return this.resourcesService.findByGymId(gymToken);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a resource by ID' })
  @ApiResponse({ status: 200, description: 'The resource has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto, 
  @Headers('authorization') headers: string) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete a resource by ID' })
  @ApiResponse({ status: 200, description: 'The resource has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Headers('authorization') headers: string) {
    return this.resourcesService.remove(id);
  }
}
