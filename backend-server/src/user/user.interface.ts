import { UserEntity } from "@app/database";

export interface userResponse{
    count:number,
    rows:UserEntity[]
}