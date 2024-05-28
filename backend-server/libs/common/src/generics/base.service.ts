import { BaseEntity } from "./entities";
import { IRepository } from "./interface/repository.interface";


export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: IRepository<T>) {}

  async findAll(relations?: string[]): Promise<T[]> {
    try {
      return await this.repository.findAll(relations);
    } catch (error) {
      throw new Error("An error occurred while fetching all entities.");
    }
  }

  async findById(id: string): Promise<T> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw new Error(`An error occurred while fetching entity with ID ${id}.`);
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw new Error("An error occurred while creating the entity.");
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      throw new Error(`An error occurred while updating entity with ID ${id}.`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new Error(`An error occurred while deleting entity with ID ${id}.`);
    }
  }
}
