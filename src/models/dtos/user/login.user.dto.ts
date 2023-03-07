import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message : "You should check password validation!"
  })
  password: string;
}
