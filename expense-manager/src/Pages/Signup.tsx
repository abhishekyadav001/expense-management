import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupAPI } from "../Redux/Auth/action";
import { RootState } from "../Redux/store"; // Assuming you have a root state type

// Initialize form data structure
const initData = { username: "", email: "", password: "" };

const Signup: React.FC = () => {
    const [formData, setFormData] = useState(initData);
    const { isLoading, token } = useSelector((store: RootState) => store.auth);
    const [toastMessage, setToastMessage] = useState<{ title: string; type: 'success' | 'error' | null }>({ title: '', type: null });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) navigate("/");
    }, [token, navigate]);

    // Handle form input changes
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signupAPI(formData))
            .then((res) => {
                setToastMessage({
                    title: "Signup Successful! Login with the same credentials.",
                    type: 'success',
                });
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            })
            .catch((error) => {
                setToastMessage({
                    title: error.message,
                    type: 'error',
                });
            });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-center text-4xl font-bold mb-6">Sign up</h2>
                <form onSubmit={handleForm} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? "cursor-not-allowed" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing up..." : "Sign up"}
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-500">
                        Login
                    </Link>
                </p>
            </div>

            {/* Toast Notification */}
            {toastMessage.type && (
                <div
                    className={`fixed bottom-5 right-5 max-w-sm w-full p-4 rounded-md shadow-lg transition-all ${toastMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                >
                    <div className="text-white font-semibold">{toastMessage.title}</div>
                </div>
            )}
        </div>
    );
};

export default Signup;
