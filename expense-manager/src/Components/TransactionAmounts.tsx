import React, { useEffect, useState } from "react";
import PaymentCard from "./PaymentCard";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionHistory } from "../Redux/Transaction/action";
import { checkBalance } from "../Redux/Auth/action";

interface Transaction {
  amount: number;
  type: string;
}

interface TransactionState {
  transaction: {
    allTransaction: Transaction[];
    totalpages: number;
  };
}

const TransactionAmounts: React.FC = () => {
  const { allTransaction, totalpages } = useSelector((store: TransactionState) => store.transaction);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalpages));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      }
      if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalpages]);

  useEffect(() => {
    dispatch(checkBalance());
    dispatch(getTransactionHistory({ page: currentPage, limit: 8 }));
  }, [currentPage, dispatch, allTransaction.length]);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <div className="grid grid-cols-4 gap-6 w-full">
        {allTransaction.map((transaction, index) => (
          <PaymentCard key={index} {...transaction} />
        ))}
      </div>
      <div className="mt-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrevious}
            className={`px-4 py-2 text-white rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500"}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-lg" disabled>
            {currentPage}
          </button>
          <button
            onClick={handleNext}
            className={`px-4 py-2 text-white rounded-lg ${currentPage >= totalpages ? "bg-gray-300" : "bg-blue-500"}`}
            disabled={currentPage >= totalpages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionAmounts;
