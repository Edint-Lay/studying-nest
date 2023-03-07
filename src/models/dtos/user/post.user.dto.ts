import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, Min } from 'class-validator';

export class PostUserDto {
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

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(12)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message : "You should check passwordCheck validation!"
  })
  passwordCheck: string;
}
