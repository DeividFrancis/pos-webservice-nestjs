import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsEmail()
  email: string;

  password: string;
}
