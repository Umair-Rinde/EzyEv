import { BaseEntity } from "../entities";


export interface IRepository<T extends BaseEntity> {
  findAll(relations?: string[]): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
