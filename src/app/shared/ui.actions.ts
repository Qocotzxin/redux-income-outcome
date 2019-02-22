import { Action } from '@ngrx/store';

export const IS_LOADING = '[UI Loading] Loading...';
export const IS_NOT_LOADING = '[UI Loading] Finished loading...';

export class ActivateLoadingAction implements Action {
  readonly type = IS_LOADING;
}

export class DeactivateLoadingAction implements Action {
  readonly type = IS_NOT_LOADING;
}

export type LoadingActions = ActivateLoadingAction | DeactivateLoadingAction;
