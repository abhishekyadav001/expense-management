import React from "react";

interface AccountsProps {
  // Define any props if needed, for example:
  // name?: string;
}

const Accounts: React.FC<AccountsProps> = (props) => {
  return (
    <div className="text-center text-xl font-semibold text-gray-700">
      Account
    </div>
  );
};

export default Accounts;
