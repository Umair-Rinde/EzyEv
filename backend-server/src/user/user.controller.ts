import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "@app/database";
import { bcrypt } from "@app/common/helpers/bycript.helper";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    async createUser (@Body()data:UserEntity){
        let password= await bcrypt.createHash(data.password)
        const user = await this.userService.createUser(data)
        return user
    }
    @Get()
    async getUser(){
        return await this.userService.getAll()
    }
    @Get(':email')
    async getOne(){
        return await this.userService.getByMail
    }
}