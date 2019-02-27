import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { LazyItemsState } from '../items.reducer';
import { IOData } from '../model/income-outcome.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: []
})
export class StatsComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  IOData: IOData = {
    outcomeAmount: 0,
    incomeAmount: 0,
    outcomeCount: 0,
    incomeCount: 0
  };

  doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];

  doughnutChartData: number[];

  constructor(private store: Store<LazyItemsState>) {}

  ngOnInit() {
    this.store
      .select('items')
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(itemState => itemState.items && itemState.items.length > 0)
      )
      .subscribe(itemState => {
        this.IOData.outcomeAmount = 0;
        this.IOData.incomeAmount = 0;
        this.IOData.outcomeCount = 0;
        this.IOData.incomeCount = 0;

        itemState.items.forEach(item => {
          if (item.income) {
            this.IOData.incomeAmount += item.amount;
            this.IOData.incomeCount++;
          } else {
            this.IOData.outcomeAmount += item.amount;
            this.IOData.outcomeCount++;
          }

          this.doughnutChartData = [
            this.IOData.incomeAmount,
            this.IOData.outcomeAmount
          ];
        });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
