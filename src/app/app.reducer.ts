import { ItemsState, itemsReducer } from './income-outcome/items.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { LoadingState, uiReducer } from './shared/ui.reducer';

export interface AppState {
  ui: LoadingState;
  auth: AuthState;
  items: ItemsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
  items: itemsReducer
};
