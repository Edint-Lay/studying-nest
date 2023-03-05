import { PipeTransform, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(val: any) {
    val = val.toUpperCase();

    if (!this.isStatusValid(val)) {
      throw new BadRequestException(`${val} is false`);
    }
    return val;
  }

  private isStatusValid(status: any) {
    const idx = this.StatusOptions.indexOf(status);
    return idx !== -1;
  }
}
