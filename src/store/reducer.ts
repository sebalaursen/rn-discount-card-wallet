import { combineReducers, createStore } from 'redux';
import wallet from './wallet';

export const rootReducer = combineReducers({
  wallet,
});

export type AppState = ReturnType<typeof rootReducer>;

export const appStore: AppState = createStore(rootReducer);
