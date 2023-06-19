import { Repository } from 'typeorm';
import { User } from '../user.entity';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto extends Repository<User> {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  // 영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only aceepts english and number',
  })
  password: string;
}
