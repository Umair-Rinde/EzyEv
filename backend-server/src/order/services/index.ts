export * from './order.service';
export * from './order-line.service';




// async createUser (userData: Partial<UserEntity>): Promise<UserEntity>{
//     const newUser = this.repo.create(userData);
//     return await this.repo.save(newUser);
// }

// as

// async getAll ():Promise<userResponse>{
//     const user= await this.repo.find()
//     return{
//         count: user.length,
//         rows : user
//     }
// }

// async getByMail(email:string):Promise<UserEntity>{
//     const user= await this.repo.findOneBy({email})
//     return user
// }

// async update(id:string,obj:UserEntity){
//     const user = await this.repo.findOneBy({id})
//     Object.assign(user,obj)
//     return await this.repo.save(user);

// }