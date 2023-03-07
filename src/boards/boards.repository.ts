import { Repository } from 'typeorm';
import { Boards } from '../models/entities/boards.entity';
import { PostBoardDto } from '../models/dtos/board/post.board.dto';

export class BoardsRepository extends Repository<Boards> {
  async postBoard(body: PostBoardDto): Promise<Boards> {
    const postBoard = this.create({
      title: body.title,
      description: body.description,
      status: body.status,
    });

    const saveBoard = await this.save(postBoard);

    return saveBoard;
  }
}
