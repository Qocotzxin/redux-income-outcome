import { Item } from './model/income-outcome.model';
import { Action } from '@ngrx/store';

export const SET_ITEMS = '[Items] Set Items';
export const RESET_ITEMS = '[Items] Reset Items';

export class SetItemsAction implements Action {
  readonly type = SET_ITEMS;

  constructor(public items: Item[]) {}
}

export class ResetItemsAction implements Action {
  readonly type = RESET_ITEMS;
}

export type ItemActions = SetItemsAction | ResetItemsAction;
