import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Boards } from '../models/entities/boards.entity';
// import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './boards.status.enum';
import { Repository } from 'typeorm';
import { PostBoardDto } from '../models/dtos/board/post.board.dto';
import { Users } from 'src/models/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: Repository<Boards>,
  ) {}

  public async postBoard(body: PostBoardDto, user: Users): Promise<Boards> {
    try {
      const postBoard = this.boardsRepository.create({
        title: body.title,
        description: body.description,
        status: body.status,
        user
      });

      const saveBoard = await this.boardsRepository.save(postBoard);

      return saveBoard;
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  public async getBoardByToken(payload : Users): Promise<Boards[]> {
    const getBuilder = this.boardsRepository.createQueryBuilder('boards');
    
    getBuilder.where(`boards.Id = :userId`, { userId : payload.id});

    const boards = await getBuilder.getMany();

    return boards
  }

  public async getBoardById(id: string): Promise<Boards> {
    const getBoardById = await this.boardsRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!getBoardById) throw new NotFoundException(`Can't find ID is ${id}`);

    return getBoardById;
  }

  public async getBoard(): Promise<Boards[]> {
    const getBoard = await this.boardsRepository.find();
    return getBoard;
  }

  public async deleteBoardByToken(payload : Users, boardId : string): Promise<boolean> {
    const deleteBuilder = this.boardsRepository.createQueryBuilder();

    const deleteBoard = await deleteBuilder
    .delete()
    .from('boards')
    .where("id = :id", { id : boardId })
    .andWhere("userId = :userId", { userId : payload.id})
    .execute();

    if(deleteBoard.affected === 1) return true;
    else return false;
  }

  public async deleteBoardById(id: string): Promise<void> {
    await this.boardsRepository.delete(id);
  }

  public async patchBoardById(id: number): Promise<void> {
    const getBoard = await this.getBoardById(id.toString());

    getBoard.status = BoardStatus.PUBLIC;

    await this.boardsRepository.save(getBoard);
  }
}
