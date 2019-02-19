import { Routes } from '@angular/router';
import { DetailComponent } from '../income-outcome/detail/detail.component';
import { IncomeOutcomeComponent } from './../income-outcome/income-outcome.component';
import { StatsComponent } from './../income-outcome/stats/stats.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatsComponent },
  { path: 'income-outcome', component: IncomeOutcomeComponent },
  { path: 'detail', component: DetailComponent }
];
