import { authReducer } from "./Auth/reducer";
import { transactionReducer } from "./Transaction/reducer";
import { applyMiddleware, combineReducers, legacy_createStore, Store, AnyAction } from "redux";
import {thunk, ThunkMiddleware } from "redux-thunk";

// Define the shape of your application's state
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  transaction: ReturnType<typeof transactionReducer>;
}

// Combine reducers with type safety
const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  transaction: transactionReducer,
});

// Create a store with Thunk middleware
export const store: Store<RootState, AnyAction> = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>)
);

export type AppDispatch = typeof store.dispatch;
