import * as types from "./actionType";

// Define the structure of your state
interface TransactionState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  totalpages: number;
  transactionHistory: any[]; // Replace `any` with a more specific type based on your transaction data structure
}

// Define the initial state
const initData: TransactionState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  totalpages: 1,
  transactionHistory: [],
};

// Define the action type
interface TransactionAction {
  type: string;
  payload?: {
    message?: string;
    alltransactions?: any[]; // Replace `any` with your specific transaction type
    totalPages?: number;
  };
}

// Create the reducer with type annotations
export const transactionReducer = (state = initData, action: TransactionAction): TransactionState => {
  switch (action.type) {
    case types.TRANSACTION_REQUEST:
      return { ...state, isLoading: true };
    case types.TRANSACTION_SUCCESSFULL:
      return { ...state, isLoading: false };
    case types.TRANSACTION_FAILED:
      return { ...state, isError: true, errorMessage: action.payload?.message || "Transaction failed." };
    case types.TRANSACTION_HISTORY_REQUEST:
      return { ...state, isLoading: true };
    case types.TRANSACTION_HISTORY_SUCCESSFULLL:
      return {
        ...state,
        transactionHistory: action.payload?.alltransactions || [],
        totalpages: action.payload?.totalPages || 1,
      };
    case types.TRANSACTION_HISTORY_FAILED:
      return { ...state, isError: true, errorMessage: action.payload?.message || "Failed to fetch transaction history." };
    default:
      return state;
  }
};
