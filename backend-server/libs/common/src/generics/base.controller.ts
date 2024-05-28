import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseEntity } from './entities';
import { BaseRepository } from './base.repository';
import { DeepPartial } from 'typeorm';

@Controller()
export class BaseController<T extends BaseEntity> {
  constructor(protected readonly BaseRepository: BaseRepository<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    try {
      return await this.BaseRepository.findAll();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    try {
      return await this.BaseRepository.findById(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() data: DeepPartial<T>): Promise<T> {
    try {
      return await this.BaseRepository.create(data);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: DeepPartial<T>): Promise<T> {
    try {
      return await this.BaseRepository.update(id, data);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.BaseRepository.delete(id);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
