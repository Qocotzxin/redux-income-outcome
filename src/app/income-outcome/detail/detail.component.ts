import { ItemService } from './../items.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Item } from '../model/income-outcome.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  items: Item[];

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.store
      .select('items')
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(itemData => itemData.items.length > 0)
      )
      .subscribe(itemData => (this.items = itemData.items));
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  removeItem(item: Item) {
    this.itemService.removeItem(item);
  }
}
