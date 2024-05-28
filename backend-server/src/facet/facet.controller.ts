import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    ValidationPipe,
    UsePipes,
  } from '@nestjs/common';
import { FacetRepository } from './facet.repository';
import { FacetEntity } from '@app/database';
  
  @Controller('facet')
  export class FacetController {
    constructor(private readonly FacetRepository: FacetRepository) {}
  
    @Post('/')
    @UsePipes(ValidationPipe)
    async create(@Body() data: FacetEntity): Promise<unknown> {
      return await this.FacetRepository.create(data);
    }
  
    @Get('/')
    async findAll(): Promise<FacetEntity[]> {
      return this.FacetRepository.findAll();
    }
  
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: string): Promise<FacetEntity> {
      return this.FacetRepository.findById(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() data: Partial<FacetEntity>,
    ): Promise<FacetEntity> {
      return this.FacetRepository.update(id, data);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
      return this.FacetRepository.delete(id);
    }
  }