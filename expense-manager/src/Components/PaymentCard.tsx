import React from "react";

interface PaymentCardProps {
    amount: number;
    type: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ amount, type }) => {
    const color = type === "Deposit" ? "text-blue-500" : "text-red-500";

    return (
        <div className="w-full p-4 shadow-lg rounded-md border border-gray-200">
            <div className="mb-4">
                <p className={`${color} font-semibold`}>Payment Type: {type}</p>
            </div>
            <div>
                <p className={`${color} font-semibold`}>Amount: {amount}</p>
            </div>
        </div>
    );
};

export default PaymentCard;
