import { ActionReducerMap } from '@ngrx/store';
import { LoadingState, uiReducer } from './shared/ui.reducer';

export interface AppState {
  ui: LoadingState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer
};
