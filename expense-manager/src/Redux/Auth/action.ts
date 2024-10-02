import * as types from "./actionTypes";
import { axiosInstance } from "../../utils/axiosconfig";
import { Dispatch } from "redux";

// Define the types for credentials and response structure
interface Credentials {
  username?:string;
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface SignupResponse {
  data: {
    id: string;
    email: string;
  };
}

interface BalanceResponse {
  balanceAmount: number;
}

// Action for login API
export const loginAPI = (creds: Credentials) => async (dispatch: Dispatch) => {
  dispatch({ type: types.ACCOUNT_LOADING });
  try {
    const res = await axiosInstance.post<LoginResponse>("/users/login", creds);

    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.token });
  } catch (error: any) {
    let errorMessage = "An unknown error occurred. Please try again later.";

    if (error.code === "ERR_NETWORK") {
      errorMessage = "Network error: Unable to connect to the server. Please check your network or try again later.";
    } else if (error.response && error.response.status === 503) {
      errorMessage = "Server is not started yet. Please try again later.";
    } else if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    dispatch({
      type: types.ACCOUNT_ERROR,
      payload: errorMessage,
    });

    return Promise.reject(errorMessage);
  }
};

// Action for signup API
export const signupAPI = (creds: Credentials) => async (dispatch: Dispatch) => {
  dispatch({ type: types.ACCOUNT_LOADING });
  try {
    const res = await axiosInstance.post<SignupResponse>("/users/signup", creds);

    dispatch({ type: types.SIGNUP_SUCCESS, payload: res.data });
  } catch (error: any) {
    let errorMessage = "An unknown error occurred. Please try again later.";

    if (error.code === "ERR_NETWORK") {
      errorMessage = "Network error: Unable to connect to the server. Please check your network or try again later.";
    } else if (error.response && error.response.status === 503) {
      errorMessage = "Server is not started yet. Please try again later.";
    } else if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    dispatch({
      type: types.ACCOUNT_ERROR,
      payload: errorMessage,
    });

    return Promise.reject(errorMessage);
  }
};

// Action to check the balance
export const checkBalance = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.CHECKBALANCE_REQUEST });
  try {
    const res = await axiosInstance.get<BalanceResponse>("/users/");

    dispatch({ type: types.CHECKBALANCE_SUCCESS, payload: res.data.balanceAmount });
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An unknown error occurred.";
    dispatch({ type: types.CHECKBALANCE_FAILED, payload: errorMessage });
    return Promise.reject(errorMessage);
  }
};

// Action for logout
export const logoutAPI = () => async (dispatch: Dispatch) => {
  dispatch({ type: types.ACCOUNT_LOGOUT });
};
