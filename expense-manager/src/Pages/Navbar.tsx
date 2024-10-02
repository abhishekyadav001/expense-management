import React, { useState } from "react";
import { Link as RichLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../Redux/Auth/action";
import logo from "../Assets/logo.png";
import { RootState } from "../Redux/store"; // Import root state type if needed

// Define link type
interface LinkType {
    name: string;
    path: string;
}

// Define token state type if not already done
interface AuthState {
    token: string | null;
}

const Links: LinkType[] = [
    { name: "Home", path: "/" },
    { name: "Transactions", path: "/transaction" },
    { name: "Account", path: "/account" },
];

const NavLink: React.FC<LinkType> = ({ path, name }) => (
    <RichLink
        to={path}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
    >
        {name}
    </RichLink>
);

const Navbar: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.auth as AuthState); // Replace RootState with  actual state type
    const dispatch = useDispatch();
    const [popupVisible, setPopupVisible] = useState(false);
    const [profilePop, setProfilePop] = useState(false);
    const handleLogout = () => {
        dispatch(logoutAPI());
        setPopupVisible(true); // Show the popup after logging out
    };

    return (
        <div className="px-4 py-3 bg-white border-b border-black sticky top-0 z-50">
            <div className="flex flex-row max-w-screen-lg mx-auto">
                <div className="w-1px">
                    <RichLink to="/">
                        <img src={logo} alt="Logo" className="w-18 h-8" />
                    </RichLink>
                </div>
                <div className="flex-1" />
                <nav className="hidden md:flex space-x-4 text-lg">
                    {Links.map((link) => (
                        <NavLink key={link.path} {...link} />
                    ))}
                </nav>
                <div className="flex-1" />
                {token ? (
                    <div className="relative">
                        <button className="focus:outline-none" onClick={() => setProfilePop(!profilePop)}>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_xtnZ-ylE50HqNDHSkokxByuAK01e04YjB2LtLE-1k6TbEYdPIRR2bOn"
                                alt="Avatar"
                            />
                        </button>
                        {profilePop ? (<div className="popup absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <RichLink to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                                Profile
                            </RichLink>
                            <hr />
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </div>) : (
                            <div className="hidden"></div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <RichLink to="/login">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Login
                            </button>
                        </RichLink>
                        <RichLink to="/signup">
                            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
                                Signup
                            </button>
                        </RichLink>
                    </div>
                )}
            </div>

            {/* Popup Notification */}
            {popupVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <p className="text-center">Logout Successful</p>
                        <button
                            onClick={() => setPopupVisible(false)}
                            className="mt-2 text-blue-500 hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
