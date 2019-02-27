import { Item } from './model/income-outcome.model';
import { ItemActions, SET_ITEMS, RESET_ITEMS } from './items.actions';
import { AppState } from '../app.reducer';

export interface ItemsState {
  items?: Item[];
}

export interface LazyItemsState extends AppState {
  items?: ItemsState;
}

const initialState: ItemsState = {
  items: []
};

export function itemsReducer(
  state = initialState,
  action: ItemActions
): ItemsState {
  switch (action.type) {
    case SET_ITEMS:
      return { items: [...action.items] };
    case RESET_ITEMS:
      return {};
    default:
      return state;
  }
}
