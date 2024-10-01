import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../Redux/Auth/action";
import { RootState } from "../Redux/store"; // Assuming you have a root state type

// Initialize form data structure
const initData = { email: "", password: "" };

const Login: React.FC = () => {
    const { isLoading, token } = useSelector((store: RootState) => store.auth);
    const [formData, setFormData] = useState(initData);
    const [toastMessage, setToastMessage] = useState<{ title: string; type: 'success' | 'error' | null }>({ title: '', type: null });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            setToastMessage({
                title: "Login Successful! Redirecting to transactions.",
                type: 'success',
            });
            setTimeout(() => {
                navigate("/transaction");
            }, 3000);
        }
    }, [token, navigate]);

    // Handle form input changes
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAPI(formData))
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setToastMessage({
                    title: err.message,
                    type: 'error',
                });
            });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-center text-4xl font-bold mb-6">Login</h2>
                <form onSubmit={handleForm} className="space-y-4">
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? "cursor-not-allowed" : ""
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-500">
                        Sign up
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

export default Login;
