import { clearLocalStorage, getLocalStorageItem, setLocalStorageItem } from "../../utils/localStorage";
import * as types from "./actionTypes";

// Define the structure of your state
interface AuthState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  signupStatus: boolean;
  accountBalance: number;
  auth: string;
  token: string;
}

// Define the initial state
const initData: AuthState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  signupStatus: false,
  accountBalance: 0,
  auth: getLocalStorageItem("accessToken") || "",
  token: getLocalStorageItem("accessToken") || "",
};

// Define the action type
interface AuthAction {
  type: string;
  payload?: any; // Adjust this to a more specific type based on your action payloads
}

// Create the reducer with type annotations
export const authReducer = (state = initData, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.ACCOUNT_LOADING:
      return { ...state, isLoading: true };
    case types.ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        signupStatus: false,
        errorMessage: action.payload || "An error occurred.",
      };
    case types.LOGIN_SUCCESS:
      setLocalStorageItem("accessToken", action.payload);
      return { ...state, isLoading: false, token: action.payload };
    case types.SIGNUP_SUCCESS:
      return { ...state, isLoading: false, signupStatus: true };
    case types.ACCOUNT_LOGOUT:
      clearLocalStorage();
      return { ...state, isLoading: false, token: "", auth: "" };
    case types.CHECKBALANCE_REQUEST:
      return { ...state, isLoading: true };
    case types.CHECKBALANCE_SUCCESS:
      return { ...state, isLoading: false, accountBalance: action.payload };
    case types.CHECKBALANCE_FAILED:
      return { ...state, isError: true, errorMessage: action.payload || "Failed to check balance." };
    default:
      return state;
  }
};
