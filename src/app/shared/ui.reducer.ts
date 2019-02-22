import { LoadingActions, IS_LOADING, IS_NOT_LOADING } from './ui.actions';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false
};

export function uiReducer(
  state = initialState,
  action: LoadingActions
): LoadingState {
  switch (action.type) {
    case IS_LOADING:
      return {
        isLoading: true
      };
    case IS_NOT_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
