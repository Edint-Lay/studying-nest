import { IsNotEmpty, IsString } from 'class-validator';
import { BoardStatus } from '../../../boards/boards.status.enum';

export class PostBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status : 'PRIVATE' | 'PUBLIC'
}
