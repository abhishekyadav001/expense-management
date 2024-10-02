import * as types from "./actionType";

// Define the structure of your transaction
interface Transaction {
  id: string;
  amount: number;
  type: string;
}

// Define the structure of your state
interface TransactionState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  totalpages: number;
  allTransaction: Transaction[]; // Retain your `allTransaction` state
}

// Define the initial state
const initData: TransactionState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  totalpages: 1,
  allTransaction: [], // Retain `allTransaction`
};

// Define the action type
interface TransactionAction {
  type: string;
  payload?: {
    message?: string;
    alltransactions?: Transaction[]; // Retain `alltransactions`
    totalPages?: number;
    id?: string;
    updatedTransaction?: Transaction;
  };
}

// Create the reducer with type annotations
export const transactionReducer = (
  state = initData,
  action: TransactionAction
): TransactionState => {
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
        isLoading: false,
        allTransaction: action.payload?.alltransactions || [], // Retain `allTransaction`
        totalpages: action.payload?.totalPages || 1,
      };
    
    case types.TRANSACTION_HISTORY_FAILED:
      return { 
        ...state, 
        isError: true, 
        errorMessage: action.payload?.message || "Failed to fetch transaction history." 
      };

    case types.EDIT_TRANSACTION:
      return {
        ...state,
        allTransaction: state?.allTransaction?.map((transaction) =>
          transaction.id === action.payload?.id ? { ...transaction, ...action.payload?.updatedTransaction } : transaction
        ),
      };

    case types.DELETE_TRANSACTION:
      return {
        ...state,
        allTransaction: state?.allTransaction?.filter(
          (transaction) => transaction.id !== action.payload?.id
        ),
      };

    default:
      return state;
  }
};
