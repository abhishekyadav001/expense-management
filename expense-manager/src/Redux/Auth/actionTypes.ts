// actionType.ts

// Define action type constants
export const ACCOUNT_LOADING = "ACCOUNT_LOADING";
export const ACCOUNT_ERROR = "ACCOUNT_ERROR";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const ACCOUNT_LOGOUT = "ACCOUNT_LOGOUT";

export const CHECKBALANCE_SUCCESS = "CHECKBALANCE_SUCCESS";
export const CHECKBALANCE_REQUEST = "CHECKBALANCE_REQUEST";
export const CHECKBALANCE_FAILED = "CHECKBALANCE_FAILED";

// Define a union type for all action types
export type ActionTypes =
  | typeof ACCOUNT_LOADING
  | typeof ACCOUNT_ERROR
  | typeof LOGIN_SUCCESS
  | typeof SIGNUP_SUCCESS
  | typeof ACCOUNT_LOGOUT
  | typeof CHECKBALANCE_SUCCESS
  | typeof CHECKBALANCE_REQUEST
  | typeof CHECKBALANCE_FAILED;
