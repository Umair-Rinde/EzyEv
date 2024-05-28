import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { BaseEntity } from './entities';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      console.error('Error occurred while finding all entities:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const where: FindOptionsWhere<T> = { id } as any;
      return await this.repository.findOne({ where });
    } catch (error) {
      console.error('Error occurred while finding entity by ID:', error);
      throw error;
    }
  }

  async create(data: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(data);
      return await this.repository.save(entity);
    } catch (error) {
      console.error('Error occurred while creating entity:', error);
      throw error;
    }
  }

  async update(id: string, data: DeepPartial<T>): Promise<T | null> {
    try {
      const where: FindOptionsWhere<T> = { id } as any;
      const entity = await this.repository.findOne({ where });
      if (!entity) {
        return null;
      }
      const updatedEntity = Object.assign(entity, data);
      await this.repository.save(updatedEntity);
      return updatedEntity;
    } catch (error) {
      console.error('Error occurred while updating entity:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      console.error('Error occurred while deleting entity:', error);
      throw error;
    }
  }
}
