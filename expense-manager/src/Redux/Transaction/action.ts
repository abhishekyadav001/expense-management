// actionCreators.ts
import * as types from "./actionType";
import { axiosInstance } from "../../utils/axiosconfig";
import { Dispatch } from "redux";

// Define types for transaction credentials
interface TransactionCreds {
  amount: number;
  type: string; // Assuming you have a type for transaction like "Deposit" or "Withdraw"
}

// Action for transaction amount
export const transactionAmount = (creds: TransactionCreds) => async (dispatch: Dispatch) => {
  dispatch({ type: types.TRANSACTION_REQUEST });
  
  try {
    if (creds.amount <= 0) {
      return Promise.reject("Please enter an amount greater than 0 Rs");
    }
    
    await axiosInstance.post("/transaction", creds);
    
    dispatch({ type: types.TRANSACTION_SUCCESSFULL });
  } catch (error: any) { // You can improve this with a more specific type if needed
    dispatch({ type: types.TRANSACTION_FAILED, payload: error.response?.data.message });
    return Promise.reject(error.response?.data.message);
  }
};

// Action for getting transaction history
export const getTransactionHistory = (creds: { page: number; limit: number }) => async (dispatch: Dispatch) => {
  const { page, limit } = creds;
  dispatch({ type: types.TRANSACTION_HISTORY_REQUEST });
  
  try {
    const res = await axiosInstance.get(`/transaction?page=${page}&limit=${limit}`);
    console.log(res);

    dispatch({ type: types.TRANSACTION_HISTORY_SUCCESSFULLL, payload: res.data });
  } catch (error: any) { // You can improve this with a more specific type if needed
    dispatch({ type: types.TRANSACTION_HISTORY_FAILED, payload: error.message });
    return Promise.reject(error.message);
  }
};
