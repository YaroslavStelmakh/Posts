import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); 
    const { login, signup } = useAuth(); 
    const navigate = useNavigate();

    // Handle form submission for login or signup
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (isLogin) {
                await login(email, password); // Login action
                toast.success("Logged in successfully!");
            } else {
                await signup(email, password); // Signup action
                toast.success("Account created successfully!");
            }
            navigate('/'); 
        } catch (error) {
            toast.error(`Failed to ${isLogin ? 'log in' : 'sign up'}: ${error.message}`);
        }
    }

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-700">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
                        <input
                            className="w-full p-3 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600" htmlFor="password">Password</label>
                        <input
                            className="w-full p-3 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={toggleForm}
                            className="text-blue-500 font-semibold ml-2"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default Login;
