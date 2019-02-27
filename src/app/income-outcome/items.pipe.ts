import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './model/income-outcome.model';

@Pipe({ name: 'itemTypePipe' })
export class ItemTypePipe implements PipeTransform {
  transform(type: boolean): string {
    if (type) {
      return 'Income';
    }

    return 'Outcome';
  }
}

@Pipe({ name: 'itemOrderPipe' })
export class ItemOrderPipe implements PipeTransform {
  transform(items: Item[]): Item[] {
    return items.sort(item => {
      if (item.income) {
        return -1;
      }

      return 1;
    });
  }
}
