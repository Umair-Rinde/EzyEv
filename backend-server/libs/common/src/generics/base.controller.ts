import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseEntity } from './entities';

@Controller()
export class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    try {
      return await this.service.findById(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() data: Partial<T>): Promise<T> {
    try {
      return await this.service.create(data);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<T>): Promise<T> {
    try {
      return await this.service.update(id, data);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
