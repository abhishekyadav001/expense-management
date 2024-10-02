import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTransaction, deleteTransaction } from "../Redux/Transaction/action"; // Adjust the path based on your file structure
import { AppDispatch } from "../Redux/store"; // Import the AppDispatch type from your store

interface PaymentCardProps {
    _id: string;  // Unique transaction ID
    amount: number;
    type: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ _id, amount, type }) => {
    // Use the typed dispatch for thunk actions
    const dispatch: AppDispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);  // Controls modal visibility
    const [editAmount, setEditAmount] = useState(amount);  // For storing the edited amount
    const [editType, setEditType] = useState(type);  // For storing the edited type

    const handleEditClick = () => {
        setIsEditing(true);  // Open the modal when "Edit" is clicked
    };

    const handleSave = () => {
        // Dispatch action to save the edited transaction
        dispatch(editTransaction(_id, { amount: editAmount, type: editType }))
            .then(() => setIsEditing(false))  // Close the modal after saving
            .catch((error) => console.error("Failed to edit transaction:", error));
    };

    const handleDelete = () => {
        // Dispatch action to delete the transaction
        dispatch(deleteTransaction(_id))
            .catch((error) => console.error("Failed to delete transaction:", error));
    };

    const handleCancel = () => {
        setIsEditing(false);  // Close the modal without saving
    };

    const color = type === "Deposit" ? "text-blue-500" : "text-red-500";

    return (
        <>
            <div className="d-flex justify-between w-full p-6 shadow-lg rounded-md border border-gray-200">
                <div className="d-flex justify-between">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded-md"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
                <div className="">
                    <div className="mb-4">
                        <p className={`${color} font-semibold`}>Payment Type: {type}</p>
                    </div>
                    <div>
                        <p className={`${color} font-semibold`}>Amount: {amount}</p>
                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            {isEditing && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Payment Type</label>
                            <select
                                value={editType}
                                onChange={(e) => setEditType(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                            >
                                <option value="Deposit">Deposit</option>
                                <option value="Withdraw">Withdraw</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Amount</label>
                            <input
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(Number(e.target.value))}
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaymentCard;
