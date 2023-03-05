import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { PostBoardDto } from './dto/post.board.dto';
import { BoardStatusValidationPipe } from './pipes/board.status.validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('')
  @UsePipes(ValidationPipe)
  postBoard(@Body() body: PostBoardDto): Board {
    return this.boardsService.postBoard(body);
  }

  @Get('')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id')
  patchBoardStatus(
    @Param('id', ParseIntPipe) id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): void {
    this.boardsService.patchBoardStatus(id, status);
  }
}
