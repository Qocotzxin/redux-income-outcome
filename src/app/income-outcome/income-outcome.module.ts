import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { IncomeOutcomeComponent } from './income-outcome.component';
import { ItemOrderPipe, ItemTypePipe } from './items.pipe';
import { StatsComponent } from './stats/stats.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { itemsReducer } from './items.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeOutcomeComponent,
    StatsComponent,
    DetailComponent,
    ItemTypePipe,
    ItemOrderPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    DashboardRoutingModule,
    StoreModule.forFeature('items', itemsReducer)
  ]
})
export class IncomeOutcomeModule {}
