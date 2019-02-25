import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemTypePipe' })
export class ItemTypePipe implements PipeTransform {
  transform(type: boolean): string {
    if (type) {
      return 'Income';
    }

    return 'Outcome';
  }
}
