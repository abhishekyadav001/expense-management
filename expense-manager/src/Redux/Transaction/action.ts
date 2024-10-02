// actionCreators.ts
import * as types from "./actionType";
import { axiosInstance } from "../../utils/axiosconfig";
import { Dispatch } from "redux";

// Define types for transaction credentials
interface TransactionCreds {
  amount: number;
  type: string; // Assuming you have a type for transaction like "Deposit" or "Withdraw"
}

interface TransactionPayload {
  amount: number;
  type: string;
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


// Action for editing a transaction
export const editTransaction = (id: string, updatedTransaction: TransactionPayload) => async (dispatch: Dispatch) => {
  try {
    console.log('trans  id', id, updatedTransaction);

      // API call to update the transaction on the backend
      const response = await axiosInstance.put(`/transaction/${id}`, updatedTransaction);
      console.log(response,)
      // Dispatch the updated transaction to the reducer
      dispatch({
          type: types.EDIT_TRANSACTION,
          payload: { id, ...updatedTransaction },
      });

      console.log("Transaction updated successfully:", response.data);
  } catch (error) {
      console.error("Error updating transaction:", error);
  }
};

// Action for deleting a transaction
export const deleteTransaction = (id: string) => async (dispatch: Dispatch) => {
  try {
      // API call to delete the transaction on the backend
      await axiosInstance.delete(`/transaction/${id}`);

      // Dispatch the delete action to the reducer
      dispatch({
          type: types.DELETE_TRANSACTION,
          payload: id,
      });

      console.log("Transaction deleted successfully");
  } catch (error) {
      console.error("Error deleting transaction:", error);
  }
};