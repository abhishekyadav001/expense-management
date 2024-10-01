import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionAmount } from "../Redux/Transaction/action";
import { checkBalance } from "../Redux/Auth/action";
import TransactionAmounts from "../Components/TransactionAmounts";
import { RootState } from "../Redux/store"; // Adjust based on your store structure

interface TransactionProps { }

interface Amount {
    amount: number;
    type: string;
}

const Transaction: React.FC<TransactionProps> = () => {
    const [amount, setAmount] = useState<Amount>({ amount: 0, type: "" });
    const [isDepositOpen, setDepositOpen] = useState(false);
    const [isWithdrawOpen, setWithdrawOpen] = useState(false);
    const dispatch = useDispatch();
    const { accountBalance, isLoading, errorMessage } = useSelector(
        (store: RootState) => store.auth
    );

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAmount({ amount: Number(value), type: name });
    };

    const handleEvent = () => {
        dispatch(transactionAmount(amount))
            .then(() => {
                setDepositOpen(false);
                setWithdrawOpen(false);
                // Show success message using Tailwind CSS popup
            })
            .catch(() => {
                // Handle error, show error message using Tailwind CSS popup
            });
    };

    useEffect(() => {
        getCurrentBalance();
    }, [amount]);

    const getCurrentBalance = () => {
        try {
            dispatch(checkBalance());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-3/4">
                <div className="flex flex-col space-y-4">
                    <h1 className="text-3xl font-bold">Transaction Page</h1>
                    <p className="text-xl">Amount: {accountBalance || 0}</p>
                    <div className="flex space-x-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={() => setDepositOpen(true)}
                        >
                            Deposit
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={() => setWithdrawOpen(true)}
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>

            {/* Deposit Modal */}
            {isDepositOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md">
                        <h2 className="text-xl font-bold mb-4">Deposit Your Money</h2>
                        <input
                            type="number"
                            name="Deposit"
                            onChange={handleInput}
                            placeholder="Enter amount"
                            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
                        />
                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handleEvent}
                            >
                                Deposit
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => setDepositOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdraw Modal */}
            {isWithdrawOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md">
                        <h2 className="text-xl font-bold mb-4">Withdraw Your Money</h2>
                        <input
                            type="number"
                            name="Withdraw"
                            onChange={handleInput}
                            placeholder="Enter amount"
                            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
                        />
                        <div className="flex space-x-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={handleEvent}
                                disabled={isLoading}
                            >
                                {isLoading ? "Withdrawing..." : "Withdraw"}
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => setWithdrawOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <TransactionAmounts />
        </div>
    );
};

export default Transaction;
