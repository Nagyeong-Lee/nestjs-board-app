import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {

  readonly BOARD_STATUS_OPTIONS = [
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE
  ]

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status option.`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.BOARD_STATUS_OPTIONS.indexOf(status);
    return index === -1 ? false : true;
  }
}
