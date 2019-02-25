import { Item } from './model/income-outcome.model';
import { ItemActions, SET_ITEMS, RESET_ITEMS } from './items.actions';

export interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: []
};

export function itemsReducer(state = initialState, action: ItemActions) {
  switch (action.type) {
    case SET_ITEMS:
      return { items: [...action.items] };
    /**
     * return { items: [...action.items.map(item => {
     * return {
     *    ...item}
     *    }
     *  )]
     * };
     */
    case RESET_ITEMS:
      return { items: [] };
    default:
      return state;
  }
}
