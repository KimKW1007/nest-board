import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    return this.boardRepository.find({
      where: { user: { id: user.id } },
      order: { id: 'ASC' },
    });
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number, user : User): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id, user:{id : user.id} });
    if (!found) {
      throw new NotFoundException(`Can't find Board with ID ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number, user : User): Promise<void> {
    const result = await this.boardRepository.delete({id, user:{id : user.id}});
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus, user : User): Promise<Board> {
    const board = await this.getBoardById(id, user);
    
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
