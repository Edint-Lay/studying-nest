import { Controller, Logger } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  UseGuards
} from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { BoardsService } from './boards.service';
import { Boards } from '../models/entities/boards.entity';
import { PostBoardDto } from '../models/dtos/board/post.board.dto';
import { customGetUserDecorator } from 'src/decorator/get.user.decorator';
import { Users } from 'src/models/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
export class BoardsController {
  private log = new Logger('BoardsController')

  constructor(
    private boardsService: BoardsService
    ) {}

  @Post('')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async postBoard(
    @Body() body: PostBoardDto,
    @customGetUserDecorator() user: Users,
  ): Promise<Boards> {
    console.log(body, user);
    return await this.boardsService.postBoard(body, user);
  }

  /** 게시물 전체 가져오기. */
  @Get('')
  async getBoard(): Promise<Boards[]> {
    return this.boardsService.getBoard();
  }

  @Get('/builder')
  @UseGuards(AuthGuard())
  async getBoardByToken(
    @customGetUserDecorator() user: Users,
  ): Promise<Boards[]> {
    this.log.verbose(`User ${user.username} try to get all boards`)
    return this.boardsService.getBoardByToken(user);
  }

  /** 해당 id의 유저 게시물만 가져오기. */
  @Get('/:id')
  async getBoardById(@Param('id', ParseIntPipe) id: string): Promise<Boards> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:boardId')
  @UseGuards(AuthGuard())
  async deleteBoardByToken(
    @customGetUserDecorator() user: Users,
    @Param('boardId') boardId: string,
  ): Promise<boolean> {
    return this.boardsService.deleteBoardByToken(user, boardId);
  }

  @Delete('/:id')
  async deleteBoardById(@Param('id') id: string): Promise<void> {
    return this.boardsService.deleteBoardById(id);
  }

  @Patch('/:id')
  async patchBoardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.patchBoardById(id);
  }
}
