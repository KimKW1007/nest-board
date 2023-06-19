import { Repository } from "typeorm";
import { User } from "../user.entity";
import { IsNotEmpty } from "class-validator";

export class AuthCredentialsDto extends Repository<User>{
  @IsNotEmpty()
  username:string;
  @IsNotEmpty()
  password:string;
}