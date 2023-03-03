import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './boards.model';
import { PostBoardDto } from './dto/post.board.dto';

@Injectable()
export class BoardsService {

    private boards : Board[] = [];

    getAllBoards() : Board[] {
        return this.boards;
    };

    postBoard(postBoardDto : PostBoardDto) {
        const board : Board = {
            id : uuid(),
            title : postBoardDto.title,
            description : postBoardDto.description,
            status : BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board
    }
}
