import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './boards.model';
import { PostBoardDto } from './dto/post.board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  postBoard(postBoardDto: PostBoardDto) {
    const board: Board = {
      id: uuid(),
      title: postBoardDto.title,
      description: postBoardDto.description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const getBoardById = this.boards.find((board) => (board.id = id));
    if (!getBoardById) throw new NotFoundException('ID를 찾을 수 없습니다.');
    return getBoardById;
  }

  async deleteBoard(id: string): Promise<void> {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  async patchBoardStatus(id: string, status: BoardStatus): Promise<Board> {
    const boards = this.getBoardById(id);
    boards.status = status;
    return boards;
  }
}
