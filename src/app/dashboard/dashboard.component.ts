import { SetItemsAction } from './../income-outcome/items.actions';
import { AppState } from './../app.reducer';
import { ItemService } from './../income-outcome/items.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.itemService
      .itemsListener()
      .subscribe(items => this.store.dispatch(new SetItemsAction(items)));
  }
}
