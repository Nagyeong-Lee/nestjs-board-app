import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from '../common/typeorm.decorator';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from '../auth/user.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

  async crate(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, desc } = createBoardDto;
    const board = this.create({
      title,
      desc,
      status: BoardStatus.PUBLIC,
      user
    });

    await this.save(board);
    return board;
  }

}
