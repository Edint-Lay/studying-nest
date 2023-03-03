import { Controller } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { PostBoardDto } from './dto/post.board.dto';

@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService
    ) {}

    @Get("")
    getAllBoard() : Board[] {
        return this.boardsService.getAllBoards();
    };

    @Post("")
    postBoard(@Body() body : PostBoardDto) : Board {
        return this.boardsService.postBoard(body);
    }
}