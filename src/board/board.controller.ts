import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe, Patch,
  Post, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoard();
  }

  @Get('/:id')
  getBoard(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoard(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  @Delete('/:id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.delete(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
