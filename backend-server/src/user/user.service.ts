import { UserEntity } from "@app/database";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { userResponse } from "./user.interface";

    @Injectable()
    export class UserService {
        constructor(
            @InjectRepository(UserEntity)
            private readonly repo: Repository<UserEntity>,
        ){}

        async createUser (userData: Partial<UserEntity>): Promise<UserEntity>{
            const newUser = this.repo.create(userData);
            return await this.repo.save(newUser);
        }

        async getAll ():Promise<userResponse>{
            const user= await this.repo.find()
            return{
                count: user.length,
                rows : user
            }
        }

        async getByMail(email:string):Promise<UserEntity>{
            const user= await this.repo.findOneBy({email})
            return user
        }
        
        async update(id:string,obj:UserEntity){
            const user = await this.repo.findOneBy({id})
            Object.assign(user,obj)
            return await this.repo.save(user);

        }
    }