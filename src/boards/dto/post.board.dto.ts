import { IsNotEmpty } from 'class-validator';

export class PostBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
