import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  test(): string {
    return 'hello world';
  }
}
