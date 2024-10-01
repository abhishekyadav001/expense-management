import React from "react";

interface ProfileProps {
    accountNumber: string;
    username: string;
    email: string;
    balance: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
    const { accountNumber, username, email, balance } = props;

    return (
        <div className="flex justify-center">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-center">Profile</h1>
                <div className="flex items-center space-x-4">
                    <img
                        className="w-12 h-12 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_xtnZ-ylE50HqNDHSkokxByuAK01e04YjB2LtLE-1k6TbEYdPIRR2bOn"
                        alt="Avatar"
                    />
                    <div className="p-4 border border-red-500 rounded-md">
                        <p className="text-2xl font-bold">Account: {accountNumber}</p>
                        <p className="text-lg">Username: {username}</p>
                        <p className="text-lg">Email: {email}</p>
                        <p className="text-lg">Balance: {balance}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                            Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
